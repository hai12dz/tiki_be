import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import * as bcrypt from "bcryptjs";
import { UpdateUserDto } from "src/common/dto/update-user.dto";
import { ChangePasswordDto } from "src/common/dto/change-password.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async register(email: string, password: string, fullName: string, phone: string): Promise<User | string> {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            return "Email đã tồn tại!";
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({ email, password: hashedPassword, fullName, phone });
        return this.userRepository.save(newUser);
    }

    async login(email: string, password: string): Promise<string | User> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return "Email không tồn tại!";
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return "Sai mật khẩu!";
        }
        return user
    }




    async updateAvatar(userId: number, avatarFileName: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.avatar = avatarFileName;
        await this.userRepository.save(user);

        return user;
    }




    async updateUser(updateUserDto: UpdateUserDto) {
        const { _id, fullName, phone, avatar } = updateUserDto;

        const user = await this.userRepository.findOne({ where: { id: _id } });
        if (!user) {
            throw new NotFoundException('User không tồn tại!');
        }

        // Cập nhật thông tin
        user.fullName = fullName || user.fullName;
        user.phone = phone || user.phone;
        user.avatar = avatar || user.avatar;

        const updatedUser = await this.userRepository.save(user);

        return {
            _id: updatedUser.id.toString(),
            email: updatedUser.email,
            fullName: updatedUser.fullName,
        };
    }

    async changePassword(changePasswordDto: ChangePasswordDto) {
        const { email, oldpass, newpass } = changePasswordDto;

        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('Email không tồn tại!');
        }

        const isMatch = await bcrypt.compare(oldpass, user.password);
        if (!isMatch) {
            throw new BadRequestException('Mật khẩu cũ không đúng!');
        }

        const hashedPassword = await bcrypt.hash(newpass, 10);
        user.password = hashedPassword;
        return await this.userRepository.save(user);
    }
}
