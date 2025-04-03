import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { BaseResponseDto } from '../../common/dto/base.response.dto';
import { SearchSuggestion } from '../../entities/search.suggestion';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('/search')
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @Get('/suggestion')
    @ApiOperation({ summary: 'Get search suggestions based on keyword' })
    @ApiQuery({ name: 'keyword', description: 'Search keyword', required: true })
    @ApiResponse({ status: 200, description: 'Return search suggestions' })
    async getSuggestions(@Query('keyword') query: string): Promise<BaseResponseDto<SearchSuggestion[]>> {
        if (!query || query.trim() === '') {
            return new BaseResponseDto(200, 'Success', []);
        }
        const suggestions = await this.searchService.findSuggestions(query);
        return new BaseResponseDto(200, 'Success', suggestions);
    }
}
