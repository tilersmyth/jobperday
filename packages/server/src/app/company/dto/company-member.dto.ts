import { ObjectType, Field, ID } from 'type-graphql';

import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class CompanyMemberDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly role: string;
  @Field(() => UserDto)
  readonly user: UserDto;
}
