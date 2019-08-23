import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class JobDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly slug: string;
}
