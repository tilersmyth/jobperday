import { Resolver, Args, Query } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';
import { ID } from 'type-graphql';

import { AppLogger } from '../app.logger';
import { SearchInput } from './inputs/search.input';
import { SearchService } from './search.service';
import { SearchInterceptor } from './search.interceptor';
import { PostingDto, SearchDto } from './dto';

@Resolver('Search')
export class SearchResolver {
  private logger = new AppLogger(SearchResolver.name);

  constructor(private readonly searchService: SearchService) {}

  @Query(() => SearchDto)
  @UseInterceptors(SearchInterceptor)
  async search(@Args('input') input: SearchInput) {
    const search = await this.searchService.query(input);
    this.logger.debug(`[${input.search}] yielded ${search.count} results`);
    return search;
  }

  @Query(() => PostingDto)
  async searchFindPosting(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.searchService.findPosting(id);
  }
}
