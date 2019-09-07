import { Resolver, Args, Query } from '@nestjs/graphql';

import { AppLogger } from '../app.logger';
import { SearchInput } from './inputs/search.input';
import { SearchService } from './search.service';

@Resolver('Search')
export class SearchResolver {
  private logger = new AppLogger(SearchResolver.name);

  constructor(private readonly searchService: SearchService) {}

  @Query(() => Boolean)
  async search(@Args('input') input: SearchInput) {
    const search = await this.searchService.query(input);
    this.logger.debug(
      `[${input.keyword} (${input.location.lat}, ${input.location.lng})] yielded ${search.length} results`,
    );
    return true;
  }
}
