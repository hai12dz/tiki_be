import { Controller, Post, Body, HttpStatus, Put, Req, Res } from "@nestjs/common";
import { UserService } from "./users.service";
import { BaseResponseDto } from "src/common/dto/base.response.dto";
import { User } from "src/entities/user.entity";
import { UpdateUserDto } from "src/common/dto/user.dto";
import { ChangePasswordDto } from "src/common/dto/password.dto";

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


    @Put("/update-user")
    async updateUser(@Body() updateUserDto: UpdateUserDto) {
        const updatedUser = await this.userService.updateUser(updateUserDto);
        return {
            statusCode: 200,
            message: 'Cập nhật user thành công!',
            data: updatedUser,
        };
    }


    @Post('/change-password')
    async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
        const data = await this.userService.changePassword(changePasswordDto);
        if (data != null) {
            return {
                statusCode: 200,
                message: 'Đổi mật khẩu thành công!',
                data: 'hello'

            };
        }

    }








}
