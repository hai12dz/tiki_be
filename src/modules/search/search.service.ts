import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { SearchSuggestion } from '../../entities/search.suggestion';

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(SearchSuggestion)
        private searchSuggestionRepository: Repository<SearchSuggestion>,
    ) { }

    async findSuggestions(query: string): Promise<SearchSuggestion[]> {
        return this.searchSuggestionRepository.find({
            where: { keyword: Like(`%${query}%`) },
            take: 10, // Limit the number of suggestions
            order: { keyword: 'ASC' },
        });
    }

    async addSuggestion(keyword: string): Promise<SearchSuggestion> {
        const suggestion = new SearchSuggestion();
        suggestion.keyword = keyword;
        return this.searchSuggestionRepository.save(suggestion);
    }
}
