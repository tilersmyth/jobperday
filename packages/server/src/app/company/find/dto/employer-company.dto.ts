import { ObjectType, Field } from 'type-graphql';

import { CompanyDto } from '../../dto/company.dto';
import { CompanyMemberDto } from '../../dto/company-member.dto';

@ObjectType()
export class EmployerCompanyDto extends CompanyDto {
  @Field(() => CompanyMemberDto)
  readonly member: CompanyMemberDto;
}
