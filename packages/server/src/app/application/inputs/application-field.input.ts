import { InputType, Field } from 'type-graphql';

import { ApplicationFieldsEnum } from '../enums';
import { ApplicationFieldTypes } from '../types';

@InputType()
export class ApplicationFieldInput {
  @Field()
  readonly question: string;
  @Field()
  readonly required: boolean;
  @Field(() => ApplicationFieldsEnum)
  readonly type: ApplicationFieldTypes;
  @Field(() => [String], { nullable: true })
  readonly options: string[];
}
