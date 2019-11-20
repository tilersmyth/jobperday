import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class JobApplicationDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly title: string;
}
