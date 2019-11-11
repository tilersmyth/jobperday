import { ObjectType, Field } from 'type-graphql';

import { CompanyMemberDto } from './member.dto';
import { CompanyDto } from '../../company/dto';
import { CompanyEntity } from '../../company/entity';

@ObjectType()
export class MemberCompanyDto extends CompanyMemberDto {
  @Field(() => CompanyDto)
  readonly company: CompanyEntity;
}
