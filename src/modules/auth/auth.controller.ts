import { Body, Controller, Post, Res, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from '../../common/dto/auth.dto';

import { Response, Request } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { ApiOperation } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @ApiOperation({ summary: 'User registration' })
    @Post('register')
    async register(@Body() dto: RegisterDto, @Res() res: Response) {
        const tokens = await this.authService.register(dto);
        this.setRefreshTokenCookie(res, tokens.refreshToken);
        return res.json(
            new BaseResponseDto(HttpStatus.CREATED, 'User registered successfully', {
                accessToken: tokens.accessToken,
            }),
        );
    }


    @ApiOperation({ summary: 'User login' })
    @Post('login')
    async login(@Body() dto: LoginDto, @Res() res: Response) {
        const tokens = await this.authService.login(dto);
        this.setRefreshTokenCookie(res, tokens.refreshToken);
        return res.json({ accessToken: tokens.accessToken });
    }
    @ApiOperation({ summary: 'User logout' })
    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Req() req: Request, @Res() res: Response) {
        const userId = (req as any).user['sub'];
        await this.authService.logout(userId);

        res.cookie('refreshToken', '', {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 0,
        });

        return res.json({ message: 'Logged out successfully' });
    }

    private setRefreshTokenCookie(res: Response, refreshToken: string) {
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
    }
}
