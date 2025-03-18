import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entities/user.entity';
import { RegisterDto, LoginDto } from '../../common/dto/auth.dto';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
        private jwtService: JwtService
    ) { }
    async register(dto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // 🔹 Tìm role "user" trước khi tạo user
        let userRole = await this.roleRepo.findOne({ where: { name: 'user' } });

        // 🔹 Nếu chưa có, tạo role "user"
        if (!userRole) {
            userRole = this.roleRepo.create({ name: 'user' });
            await this.roleRepo.save(userRole);
        }

        // 🔹 Tạo user với role mặc định là "user"
        const user = this.userRepo.create({
            ...dto,
            password: hashedPassword,
            role: userRole, // ✅ Đảm bảo user có role "user"
        });

        await this.userRepo.save(user);
        return this.generateTokens(user);
    }



    async login(dto: LoginDto) {
        const user = await this.userRepo.findOne({
            where: { email: dto.username },
            relations: ['role'], // Load role của user
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const tokens = await this.generateTokens(user);

        return {
            data: {
                access_token: tokens.accessToken,
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    role: user.role?.name || 'user', // Kiểm tra role có tồn tại không
                    avatar: user.avatar || '', // Nếu user chưa có avatar, trả về chuỗi rỗng
                }
            }
        };
    }

    async logout(userId: number) {
        if (!userId) throw new BadRequestException('User ID không hợp lệ');

        await this.userRepo.update(userId, { refreshToken: null });
    }


    private async generateTokens(user: User) {
        const payload = { sub: user.id, email: user.email, role: user.role!.name };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        });

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userRepo.update(user.id, { refreshToken: hashedRefreshToken });

        return { accessToken, refreshToken };
    }





    async getUserById(userId: number): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        return user; // Trả về entity gốc của TypeORM
    }






}