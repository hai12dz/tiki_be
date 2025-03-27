import { HttpException, HttpStatus } from '@nestjs/common';

export class IdInvalidException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
