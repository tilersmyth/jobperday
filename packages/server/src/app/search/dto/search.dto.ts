import { ObjectType, Field, ID, Int, Float } from 'type-graphql';
import { JobDto } from '../../job/dto/job.dto';
import { SearchResultsDto } from './search-results';

@ObjectType()
export class SearchDto {
  @Field(() => Int)
  readonly count: number;
  @Field(() => [SearchResultsDto])
  readonly results: SearchResultsDto[];
}
