import { ObjectType, Field } from 'type-graphql';

import { CompanyMemberEntity, CompanyMemberDto } from '../../company-member';
import { CompanyDto } from './company.dto';

@ObjectType()
export class CurrentCompanyDto extends CompanyDto {
  @Field(() => [CompanyMemberDto])
  readonly members: CompanyMemberEntity[];
}
