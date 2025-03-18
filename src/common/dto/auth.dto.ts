import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({ example: 'StrongPassword123!' })
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: '0987654321' })
    @IsNotEmpty()
    @MinLength(6)
    phone: string;

}

export class LoginDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    username: string;

    @ApiProperty({ example: 'password123' })
    @IsNotEmpty()
    password: string;
}
