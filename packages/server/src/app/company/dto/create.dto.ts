import { ObjectType, Field } from 'type-graphql';

import { CompanyDto } from './company.dto';
import { CompanyContactDto, CompanyContactEntity } from '../../company-contact';

@ObjectType()
export class CreateCompanyDto extends CompanyDto {
  @Field(() => CompanyContactDto)
  readonly contact: CompanyContactEntity;
}
