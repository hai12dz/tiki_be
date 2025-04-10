import { Expose, Type } from 'class-transformer';
import { UserDto } from './user.dto';

export class ReviewDto {
    @Expose()
    id: string;

    @Expose()
    rating: number;

    @Expose()
    comment: string;

    @Expose()
    img: string;

    @Expose()
    isBuy: boolean;

    @Expose()
    commentReply: string;

    @Expose()
    createdAt: Date;

    @Expose()
    @Type(() => UserDto)
    user: UserDto;
}
