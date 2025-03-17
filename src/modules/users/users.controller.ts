import { Controller, Post, Body, HttpStatus } from "@nestjs/common";
import { UserService } from "./users.service";
import { BaseResponseDto } from "src/common/dto/base-response.dto";
import { User } from "src/entities/user.entity";

@Controller("/users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("/register")
    async register(@Body() body: { email: string; password: string, fullName: string, phone: string }) {
        const data = await this.userService.register(body.email, body.password, body.fullName, body.phone);
        return new BaseResponseDto<User | string>(HttpStatus.CREATED, "Register Success", data)
    }

    @Post("/login")
    async login(@Body() body: { email: string; password: string }) {
        const data = await this.userService.login(body.email, body.password);
        return new BaseResponseDto<User | string>(HttpStatus.CREATED, "Login Success", data)

    }
}
