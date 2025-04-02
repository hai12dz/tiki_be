import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { BaseResponseDto } from '../../common/dto/base.response.dto';
import { SearchSuggestion } from '../../entities/search.suggestion';

@Controller('/search')
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @Get('/suggestion')
    async getSuggestions(@Query('q') query: string): Promise<BaseResponseDto<SearchSuggestion[]>> {
        if (!query || query.trim() === '') {
            return new BaseResponseDto(200, 'Success', []);
        }
        const suggestions = await this.searchService.findSuggestions(query);
        return new BaseResponseDto(200, 'Success', suggestions);
    }
}
