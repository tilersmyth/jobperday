import { ObjectType, Field, ID } from 'type-graphql';

import { UserLocationDto } from '../../user-location/dto';

@ObjectType()
export class UserSessionDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly first_name: string;
  @Field()
  readonly last_name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly realm: string;
  @Field()
  readonly is_verified: boolean;
  @Field(() => [String])
  readonly setup: string[];
  @Field()
  readonly created_at: Date;
  @Field(() => UserLocationDto, { nullable: true })
  readonly location?: UserLocationDto;
}
