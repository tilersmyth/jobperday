import { InputType, Field } from 'type-graphql';
import { ApplicationFieldOptions } from '@jobperday/common';

import { ApplicationFieldsEnum } from '../enums';

@InputType()
export class ApplicationFieldInput {
  @Field()
  readonly question: string;
  @Field()
  readonly required: boolean;
  @Field(() => ApplicationFieldsEnum)
  readonly type: ApplicationFieldOptions;
  @Field(() => [String], { nullable: true })
  readonly options: string[];
}
