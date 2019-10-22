import { ObjectType, Field, ID } from 'type-graphql';

import { ApplicationFieldTypes } from '../types';
import { ApplicationFieldsEnum } from '../enums';

@ObjectType()
export class ApplicationFieldDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly question: string;
  @Field()
  readonly required: boolean;
  @Field(() => ApplicationFieldsEnum)
  readonly type: ApplicationFieldTypes;
  @Field(() => [String])
  readonly options: string[];
}
