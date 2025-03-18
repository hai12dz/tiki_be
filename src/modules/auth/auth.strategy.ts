import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    // 🟢 Lấy Access Token từ Header
                    let token = req.headers.authorization?.split(' ')[1];

                    // 🔵 Nếu không có Access Token, lấy Refresh Token từ Cookie
                    if (!token) {
                        token = req.cookies?.refresh_token;
                        if (!token) return null; // Không có token nào
                        console.log('🔄 Using refresh token from cookies:', token);
                    } else {
                        console.log('🛡️ Using access token from headers:', token);
                    }

                    return token;
                },
            ]),
            secretOrKey: configService.get<string>('JWT_ACCESS_SECRET')!,
            ignoreExpiration: false, // Bật kiểm tra hạn token
        });
    }

    async validate(payload: any) {
        if (!payload) {
            throw new UnauthorizedException('Invalid Token');
        }

        console.log('✅ Decoded JWT Payload:', payload);

        return { userId: payload.sub, email: payload.email, role: payload.role };
    }
}
