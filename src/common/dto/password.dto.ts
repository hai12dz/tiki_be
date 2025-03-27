import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    oldpass: string;

    @IsNotEmpty()
    @MinLength(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' })
    newpass: string;
}
