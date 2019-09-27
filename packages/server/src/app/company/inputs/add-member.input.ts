import { InputType, Field } from 'type-graphql';
import { MemberRoles } from '../../types';
import { CompanyEntity } from '../entity';
import { UserEntity } from '../../user/entity';

@InputType()
export class AddMemberInput {
  @Field(() => CompanyEntity)
  readonly company: CompanyEntity;
  @Field(() => UserEntity)
  readonly user: UserEntity;
  @Field()
  readonly role: MemberRoles;
  @Field()
  readonly confirmed: boolean;
}
