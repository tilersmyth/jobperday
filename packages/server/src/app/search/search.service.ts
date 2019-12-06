import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { SearchInput } from './inputs/search.input';
import { AppLogger } from '../app.logger';
import { JOB_TOKEN } from '../job/job.constants';
import { JobEntity } from '../job/entity';
import { JOB_POSTING_TOKEN } from '../job-posting/posting.constants';
import { JobPostingEntity } from '../job-posting';

@Injectable()
export class SearchService {
  private logger = new AppLogger(SearchService.name);

  constructor(
    @Inject(JOB_TOKEN)
    protected readonly repository: Repository<JobEntity>,
    @Inject(JOB_POSTING_TOKEN)
    protected readonly postingRepo: Repository<JobPostingEntity>,
  ) {}

  public async query(input: SearchInput) {
    try {
      const {
        location: { coords },
        filters,
        pagination,
      } = input;

      const query = this.postingRepo
        .createQueryBuilder('posting')
        .innerJoinAndSelect('posting.address', 'address')
        .innerJoinAndSelect('posting.company', 'company')
        .innerJoinAndSelect('company.profile', 'profile')
        .innerJoinAndSelect('posting.job', 'job');

      const search = input.search.trim();

      if (search) {
        query.addSelect(
          `ts_rank_cd(job.document_with_weights, to_tsquery('english', '${search}:*'))`,
          'rank',
        );
      }

      query
        .where('posting.apply_deadline > :date', { date: new Date() })
        .andWhere('posting.pay_rate >= :pay_rate', {
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
        posting.location, :radius)`,
        { radius },
      );

      if (search) {
        query
          .orderBy('rank', 'DESC')
          .addOrderBy('posting.apply_deadline', 'DESC');
      }

      const { entities, raw } = await query
        .skip(pagination.skip)
        .take(pagination.take)
        .getRawAndEntities();

      const count = await query.getCount();

      const results = entities.map((posting, i) => {
        return { posting, rank: raw[i].rank ? raw[i].rank : 1 };
      });

      return { count, results };
    } catch (error) {
      this.logger.error('Search query error', error.name);
      throw error;
    }
  }

  public async findPosting(id: string) {
    return this.postingRepo
      .createQueryBuilder('posting')
      .innerJoinAndSelect('posting.address', 'address')
      .innerJoinAndSelect('posting.company', 'company')
      .innerJoinAndSelect('company.profile', 'profile')
      .innerJoinAndSelect('posting.job', 'job')
      .where('posting.id = :id', { id })
      .getOne();
  }
}
