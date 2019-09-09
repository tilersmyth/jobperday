import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { SearchInput } from './inputs/search.input';
import { AppLogger } from '../app.logger';
import { JOB_TOKEN } from '../job/job.constants';
import { JobEntity } from '../job/entity';

@Injectable()
export class SearchService {
  private logger = new AppLogger(SearchService.name);

  constructor(
    @Inject(JOB_TOKEN)
    protected readonly repository: Repository<JobEntity>,
  ) {}

  public async query(input: SearchInput) {
    try {
      // convert miles to meters for PostGIS
      const radius = input.radius * 1609.344;

      const query = this.repository
        .createQueryBuilder('job')
        .innerJoinAndSelect('job.instances', 'instances')
        .addSelect(
          `ts_rank_cd(job.document_with_weights, to_tsquery('english', '${input.keyword}:*'))`,
          'rank',
        )
        .where('instances.apply_deadline > DATE(NOW())');

      if (input.pay_rate) {
        query.andWhere('instances.pay_rate >= :pay_rate', {
          pay_rate: input.pay_rate,
        });
      }

      const { entities, raw } = await query
        .andWhere(
          `job.document_with_weights @@ to_tsquery('english', '${input.keyword}:*')`,
        )
        .andWhere(
          `ST_DWithin(ST_GeogFromText('SRID=4326;POINT(${input.location.lng} ${input.location.lat})'),
          instances.location, :radius)`,
          { radius },
        )
        .orderBy('rank', 'DESC')
        .skip(input.skip)
        .take(input.take)
        .getRawAndEntities();

      return entities
        .map((job, index) => {
          return { job, rank: raw[index].rank, isTypeOf: 'Jobs' };
        })
        .reduce(
          (acc, entity) => (entity.rank > 0 ? [entity, ...acc] : acc),
          [],
        );
    } catch (error) {
      this.logger.error('Search query error', error.name);
      throw error;
    }
  }
}
