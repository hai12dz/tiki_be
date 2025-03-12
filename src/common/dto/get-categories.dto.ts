import { ApiProperty } from '@nestjs/swagger';

export class GetCategoriesDto {
    @ApiProperty({ type: [String] })
    categories: string[];
}
