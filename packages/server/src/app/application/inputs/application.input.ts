import { InputType, Field } from 'type-graphql';

import { ApplicationFieldInput } from './application-field.input';
import { ApplicationFieldEntity } from '../entity';

@InputType()
export class ApplicationInput {
  @Field()
  readonly title: string;
  @Field(() => [ApplicationFieldInput])
  readonly fields: ApplicationFieldEntity[];
}
