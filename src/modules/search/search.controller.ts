import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { BaseResponseDto } from '../../common/dto/base.response.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

@Controller('/search')
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @Get('/suggestion')
    @ApiOperation({ summary: 'Get search suggestions based on keyword' })
    @ApiQuery({ name: 'keyword', description: 'Search keyword', required: true })
    @ApiResponse({ status: 200, description: 'Return search suggestions' })
    async getSuggestions(@Query('keyword') query: string): Promise<BaseResponseDto<any[]>> {
        if (!query || query.trim() === '') {
            return new BaseResponseDto(HttpStatus.OK, 'Success', []);
        }
        const suggestions = await this.searchService.findSuggestions(query);
        return new BaseResponseDto(HttpStatus.OK, 'Success', suggestions);
    }
}
