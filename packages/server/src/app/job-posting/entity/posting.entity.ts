import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
  BeforeInsert,
  AfterLoad,
} from 'typeorm';

import { JobEntity } from '../../job/entity/job.entity';
import { AddressEntity } from '../../address/entity/address.entity';
import { CompanyEntity } from '../../company/entity/company.entity';
import { PostingStatusEnum } from '../enums';

@Entity('job_postings')
export class JobPostingEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('timestamp')
  public start_date: Date;

  @Column('timestamp')
  public end_date: Date;

  @Column('varchar')
  public pay_rate: string;

  @Column('int')
  public total_openings: number;

  @Column({ type: 'int' })
  public remaining_openings: number;

  @Column({ type: 'boolean', default: true })
  public active: boolean;

  public status: PostingStatusEnum;

  @Column('timestamp')
  public apply_deadline: Date;

  @Column({
    type: 'geometry',
    nullable: true,
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  public location: object;

  @Column('uuid')
  public applicationId: string;

  @ManyToOne(() => CompanyEntity)
  public company: CompanyEntity;

  @ManyToOne(() => JobEntity, job => job.postings)
  public job: JobEntity;

  @ManyToOne(() => AddressEntity)
  public address: AddressEntity;

  @CreateDateColumn() created_at: Date;

  @BeforeInsert()
  setRemainingOpenings() {
    this.remaining_openings = this.total_openings;
  }
}
