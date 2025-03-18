import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../../entities/user.entity'
import { Role } from '../../entities/role.entity'
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]), // ✅ Import User và Role vào module
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '15000m' },

        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }