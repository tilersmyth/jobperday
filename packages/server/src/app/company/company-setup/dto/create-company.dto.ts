import { ObjectType, Field, ID, Int } from 'type-graphql';

import { CompanyAddressDto } from '../../dto/company-address.dto';

@ObjectType()
export class CreateCompanyDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly slug: string;
  @Field()
  readonly phone: string;
  @Field()
  readonly setup_complete: boolean;
  @Field(() => Int)
  readonly setup_stage: number;
  @Field(() => CompanyAddressDto)
  readonly address: CompanyAddressDto;
}
