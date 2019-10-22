import { ObjectType, Field, ID } from 'type-graphql';

import { ApplicationFieldDto } from './application-field.dto';
import { ApplicationFieldEntity } from '../entity';

@ObjectType()
export class ApplicationDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly title: string;
  @Field(() => [ApplicationFieldDto])
  readonly fields: ApplicationFieldEntity[];
}
