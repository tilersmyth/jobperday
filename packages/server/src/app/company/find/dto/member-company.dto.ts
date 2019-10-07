import { ObjectType, Field } from 'type-graphql';

import { CompanyMemberDto } from '../../dto/company-member.dto';
import { CompanyDto } from '../../dto/company.dto';

@ObjectType()
export class MemberCompanyDto extends CompanyMemberDto {
  @Field(() => CompanyDto)
  readonly company: CompanyDto;
}
