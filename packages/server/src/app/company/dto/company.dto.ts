import { ObjectType, Field, ID, Int } from 'type-graphql';

@ObjectType()
export class CompanyDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly setup_complete: boolean;
  @Field(() => Int)
  readonly setup_stage: number;
}
