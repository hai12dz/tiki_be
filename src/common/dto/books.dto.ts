import { ApiProperty } from '@nestjs/swagger';

export class GetBooksDto {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    thumbnail: string;

    @ApiProperty({ type: [String] })
    slider: string[];

    @ApiProperty()
    mainText: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    sold: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    category: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
