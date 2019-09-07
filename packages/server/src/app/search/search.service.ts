import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { SearchInput } from './inputs/search.input';
import { AppLogger } from '../app.logger';
import { JOB_INSTANCE_TOKEN } from '../job/job.constants';
import { JobInstanceEntity } from '../job/entity';
import { inspect } from 'util';

@Injectable()
export class SearchService {
  private logger = new AppLogger(SearchService.name);

  constructor(
    @Inject(JOB_INSTANCE_TOKEN)
    protected readonly repository: Repository<JobInstanceEntity>,
  ) {}

  public async query(input: SearchInput) {
    const radius = input.radius * 1609.344;

    const test = await this.repository
      .createQueryBuilder('instance')
      .leftJoinAndSelect('instance.job', 'job')
      .where(
        // tslint:disable-next-line: quotemark
        `ST_DWithin(ST_GeogFromText('SRID=4326;POINT(${input.location.lat} ${input.location.lng})'), instance.location, :radius)`,
      )
      .addSelect(
        // tslint:disable-next-line: quotemark
        "ts_rank_cd(to_tsvector(coalesce(job.description,'')), plainto_tsquery('english', :query))",
        'rank',
      )
      .orderBy('rank', 'DESC')
      .setParameter('query', input.keyword)
      .setParameter('radius', radius)
      .getRawAndEntities();

    test.entities.map((entity: any) =>
      this.logger.debug(inspect(entity.location)),
    );

    this.logger.debug(inspect(test));

    return [];
  }
}
