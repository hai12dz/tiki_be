import { Transform, Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    @Transform(({ value }) => Number(value))
    _id: number;

    @IsOptional()
    @IsString()
    fullName?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    avatar?: string;
}

export class UserDto {
    @Expose()
    id: string;

    @Expose()
    fullName: string;

    @Expose()
    avatar: string;

    @Expose()
    totalEvaluation: number;

    @Expose()
    totalThanks: number;
}
