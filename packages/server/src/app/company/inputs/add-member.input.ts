import { InputType, Field, ID } from 'type-graphql';
import { MemberRoles } from '../../types';
import { CompanyEntity } from '../entity';

@InputType()
export class AddMemberInput {
  @Field()
  readonly company: CompanyEntity;
  @Field(() => ID)
  readonly userId: string;
  @Field()
  readonly role: MemberRoles;
  @Field()
  readonly confirmed: boolean;
}