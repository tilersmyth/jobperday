import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards, UseInterceptors } from '@nestjs/common';

import { CompanyImageDto } from './dto';
import { UserAuthGuard } from '../../auth/guards/user-auth.guard';
import { AppLogger } from '../../app.logger';
import { CompanyImageService } from './image.service';
import { Role } from '../roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { CompanyEntity } from '../entity';
import { Company } from '../../_helpers';
import { UploadImageInput } from './inputs/upload-image.input';

@UseGuards(UserAuthGuard)
@Resolver('CompanyImage')
export class CompanyImageResolver {
  private logger = new AppLogger(CompanyImageResolver.name);

  constructor(private readonly imageService: CompanyImageService) {}

  @Query(() => [CompanyImageDto])
  @Role('manager')
  @UseGuards(RolesGuard)
  async findAllCompanyImages(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
  ) {
    return this.imageService.findAll({ where: { companyId: company.id } });
  }

  @Mutation(() => CompanyImageDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async uploadImage(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
    @Args('input') input: UploadImageInput,
  ) {
    return this.imageService.upload(company, input);
  }
}
