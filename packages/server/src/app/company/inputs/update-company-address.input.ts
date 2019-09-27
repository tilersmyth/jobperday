import { InputType, Field, Float } from 'type-graphql';

@InputType()
export class UpdateCompanyAddressInput {
  @Field({ nullable: true })
  readonly phone: string;
  @Field({ nullable: true })
  readonly street: string;
  @Field({ nullable: true })
  readonly street2: string;
  @Field({ nullable: true })
  readonly city: string;
  @Field({ nullable: true })
  readonly state: string;
  @Field({ nullable: true })
  readonly postal_code: string;
  @Field({ nullable: true })
  readonly country: string;
  @Field(() => Float, { nullable: true })
  readonly coord_lat: number;
  @Field(() => Float, { nullable: true })
  readonly coord_lng: number;
}
