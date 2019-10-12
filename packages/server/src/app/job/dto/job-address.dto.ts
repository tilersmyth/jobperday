import { ObjectType, Field, ID, Float } from 'type-graphql';

@ObjectType()
export class JobAddressDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly street: string;
  @Field({ nullable: true })
  readonly street2: string;
  @Field()
  readonly city: string;
  @Field()
  readonly state: string;
  @Field()
  readonly postal_code: string;
  @Field()
  readonly country: string;
  @Field(() => Float)
  readonly coord_lat: number;
  @Field(() => Float)
  readonly coord_lng: number;
}
