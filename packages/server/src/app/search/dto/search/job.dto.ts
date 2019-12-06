import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class SearchJobDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly title: string;
}
