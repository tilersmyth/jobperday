import { ObjectType, Field, ID } from 'type-graphql';
import { ApplicationFieldOptions } from '@jobperday/common';

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
  readonly type: ApplicationFieldOptions;
  @Field(() => [String])
  readonly options: string[];
}
