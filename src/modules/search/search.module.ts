import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchSuggestion } from '../../entities/search.suggestion';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
    imports: [TypeOrmModule.forFeature([SearchSuggestion])],
    controllers: [SearchController],
    providers: [SearchService],
    exports: [SearchService],
})
export class SearchModule { }
