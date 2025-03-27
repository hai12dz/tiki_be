import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BaseResponseDto } from '../dto/base.response.dto';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        // Xử lý lỗi HTTP
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            message = typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse['message'];
        }
        // Xử lý lỗi QueryFailedError của TypeORM
        else if (exception instanceof QueryFailedError) {
            status = HttpStatus.BAD_REQUEST;
            message = `Database Error: ${(exception as any).message}`;
        }
        // Xử lý lỗi không xác định
        else if (exception instanceof Error) {
            message = exception.message;
        }

        response.status(status).json(new BaseResponseDto(status, message));
    }
}
