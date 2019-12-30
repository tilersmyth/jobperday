import { ObjectType, Field } from 'type-graphql';

import { JobPostingDto } from './posting.dto';
import { PostingStatusEnum } from '../enums';
import { AddressDto } from '../../address';

@ObjectType()
export class JobPostingSingleDto extends JobPostingDto {
  @Field(() => PostingStatusEnum)
  readonly status: PostingStatusEnum;
  @Field(() => AddressDto)
  readonly address: AddressDto;
}
