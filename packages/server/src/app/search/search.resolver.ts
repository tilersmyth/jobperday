import { Resolver, Args, Query } from '@nestjs/graphql';

import { AppLogger } from '../app.logger';
import { SearchInput } from './inputs/search.input';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';
import { UseInterceptors } from '@nestjs/common';
import { SearchInterceptor } from './search.interceptor';

@Resolver('Search')
export class SearchResolver {
  private logger = new AppLogger(SearchResolver.name);

  constructor(private readonly searchService: SearchService) {}

  @Query(() => SearchDto)
  @UseInterceptors(SearchInterceptor)
  async search(@Args('input') input: SearchInput) {
    const search = await this.searchService.query(input);

    this.logger.debug(
      `[${input.search}] yielded ${search.results.length} results`,
    );
    return search;
  }
}
