import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class CompanyImageDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly filename: string;
  @Field()
  readonly path: string;
  @Field({ nullable: true })
  readonly thumb: string;
  @Field()
  readonly awsKey: string;
}
