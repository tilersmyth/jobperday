import { ObjectType, Field, ID, Int, Float } from 'type-graphql';
import { JobDto } from '../../job/dto/job.dto';

@ObjectType()
export class SearchResultsDto {
  @Field(() => JobDto)
  readonly job: JobDto;
  @Field(() => Float)
  readonly rank: number;
  @Field()
  readonly isTypeOf: string;
}
