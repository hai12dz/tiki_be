import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const req: Request = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;

        if (!authHeader) throw new UnauthorizedException('No token provided');

        try {
            const token = authHeader.split(' ')[1];
            req.user = this.jwtService.verify(token, { secret: process.env.JWT_ACCESS_SECRET });
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
