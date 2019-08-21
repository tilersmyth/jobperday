import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class JwtDto {
  @Field(() => Int)
  readonly expiresIn: number;
  @Field()
  readonly accessToken: string;
  @Field()
  readonly refreshToken: string;
}
