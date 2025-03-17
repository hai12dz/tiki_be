import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import * as bcrypt from "bcryptjs";

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
}
