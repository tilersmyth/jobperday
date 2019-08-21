import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class TokenDto {
  @Field()
  readonly id: string;
  @Field(() => Int)
  readonly expiresIn: number;
  @Field()
  readonly audience: string;
  @Field()
  readonly issuer: string;
}
