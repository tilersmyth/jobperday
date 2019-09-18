import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { SearchInput } from './inputs/search.input';
import { AppLogger } from '../app.logger';
import { JOB_TOKEN } from '../job/job.constants';
import { JobEntity } from '../job/entity';
import { inspect } from 'util';

@Injectable()
export class SearchService {
  private logger = new AppLogger(SearchService.name);

  constructor(
    @Inject(JOB_TOKEN)
    protected readonly repository: Repository<JobEntity>,
  ) {}

  public async query(input: SearchInput) {
    try {
      const {
        location: { coords },
        options,
        pagination,
      } = input;

      const query = this.repository
        .createQueryBuilder('job')
        .innerJoinAndSelect('job.instances', 'instances');

      const search = input.search.trim();

      if (search) {
        query.addSelect(
          `ts_rank_cd(job.document_with_weights, to_tsquery('english', '${search}:*'))`,
          'rank',
        );
      }

      query
        .where('instances.apply_deadline > DATE(NOW())')
        .andWhere('instances.pay_rate >= :pay_rate', {
          pay_rate: options.pay_rate,
        });

      if (search) {
        query.andWhere(
          `job.document_with_weights @@ to_tsquery('english', '${search}:*')`,
        );
      }

      // convert miles to meters for PostGIS (default 200 mi if no selection)
      const radius = options.radius > 0 ? options.radius * 1609.344 : 321869;
      this.logger.debug(`RADIUS ${radius}`);
      query.andWhere(
        `ST_DWithin(ST_GeogFromText('SRID=4326;POINT(${coords.lng} ${coords.lat})'),
          instances.location, :radius)`,
        { radius },
      );

      const { entities, raw } = await query
        .orderBy('rank', 'DESC')
        .skip(pagination.skip)
        .take(pagination.take)
        .getRawAndEntities();

      const count = await query.getCount();

      const results = entities.map((job, index) => {
        return { job, rank: raw[index].rank, isTypeOf: 'Jobs' };
      });

      return { count, results };
    } catch (error) {
      this.logger.error('Search query error', error.name);
      throw error;
    }
  }
}
