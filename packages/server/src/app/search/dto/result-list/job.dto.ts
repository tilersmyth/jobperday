import { ObjectType, Field, ID } from 'type-graphql';

import { SearchJobPostingDto } from './job-posting.dto';
import { SearchCompanyDto } from './company.dto';

@ObjectType()
export class SearchJobDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly title: string;
  @Field(() => [SearchJobPostingDto])
  readonly postings: SearchJobPostingDto[];
  @Field(() => SearchCompanyDto)
  readonly company: SearchCompanyDto;
}
