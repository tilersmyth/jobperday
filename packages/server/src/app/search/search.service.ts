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
      const {
        location: { coords },
        filters,
        pagination,
      } = input;

      const query = this.repository
        .createQueryBuilder('job')
        .innerJoinAndSelect('job.company', 'company')
        .innerJoinAndSelect('company.profile', 'profile')
        .innerJoinAndSelect('job.postings', 'postings')
        .innerJoinAndSelect('postings.address', 'address');

      const search = input.search.trim();

      if (search) {
        query.addSelect(
          `ts_rank_cd(job.document_with_weights, to_tsquery('english', '${search}:*'))`,
          'rank',
        );
      }

      query
        .where('postings.apply_deadline > :date', { date: new Date() })
        .andWhere('postings.pay_rate >= :pay_rate', {
          pay_rate: filters.pay_rate,
        });

      if (search) {
        query.andWhere(
          `job.document_with_weights @@ to_tsquery('english', '${search}:*')`,
        );
      }

      // convert miles to meters for PostGIS (default 200 mi if no selection)
      const radius = filters.radius * 1609.344;
      this.logger.debug(`RADIUS ${radius}`);
      query.andWhere(
        `ST_DWithin(ST_GeogFromText('SRID=4326;POINT(${coords.lng} ${coords.lat})'),
        postings.location, :radius)`,
        { radius },
      );

      if (search) {
        query.orderBy('rank', 'DESC');
      }

      const { entities, raw } = await query
        .skip(pagination.skip)
        .take(pagination.take)
        .getRawAndEntities();

      const count = await query.getCount();

      const results = entities.map((job, i) => {
        return { job, rank: raw[i].rank ? raw[i].rank : 1 };
      });

      return { count, results };
    } catch (error) {
      this.logger.error('Search query error', error.name);
      throw error;
    }
  }

  public async findJob(id: string) {
    const query = this.repository
      .createQueryBuilder('job')
      .innerJoinAndSelect('job.company', 'company')
      .innerJoinAndSelect('company.profile', 'profile')
      .innerJoinAndSelect('job.postings', 'postings')
      .innerJoinAndSelect('postings.address', 'address');

    query
      .where('job.id = :id', { id })
      .andWhere('postings.apply_deadline > :date', { date: new Date() });

    return query.getOne();
  }
}
