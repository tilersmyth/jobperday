import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import uuid from 'uuid/v1';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { CompanyImageEntity } from './entity';
import { CompanyEntity } from '../entity';
import { COMPANY_IMAGE_TOKEN } from './image.constants';
import { UploadImageInput } from './inputs/upload-image.input';
import { AWSS3Service } from '../../_helpers';
import { CompanyImageDto } from './dto';

@Injectable()
export class CompanyImageService extends CrudService<CompanyImageEntity> {
  private logger = new AppLogger(CompanyImageService.name);

  constructor(
    @Inject(COMPANY_IMAGE_TOKEN)
    protected readonly repository: Repository<CompanyImageEntity>,
    private readonly s3Service: AWSS3Service,
  ) {
    super();
  }

  public async upload(
    company: CompanyEntity,
    input: UploadImageInput,
  ): Promise<CompanyImageDto> {
    const file = await input.image;
    const key = `companies/${company.id}/${uuid()}`;
    const s3Data = await this.s3Service.upload(key, file);

    const image = new CompanyImageEntity();
    image.filename = file.filename;
    image.path = s3Data.Location;
    image.awsKey = s3Data.Key;
    image.companyId = company.id;
    return this.repository.save(image);
  }
}
