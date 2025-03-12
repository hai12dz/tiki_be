import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T> {
    @ApiProperty({ example: 400 })
    error?: string | string[];


    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ example: 'Success' })
    message: string;

    @ApiProperty()
    data?: T; // Data có thể là bất kỳ kiểu nào

    constructor(statusCode: number, message: string, data?: T) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}
