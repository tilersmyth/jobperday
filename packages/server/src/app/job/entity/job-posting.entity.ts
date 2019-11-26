import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';

import { JobEntity } from './job.entity';
import { AddressEntity } from '../../address';

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

  @Column({ type: 'boolean', default: false })
  public active: boolean;

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
  public companyId: string;

  @Column('uuid')
  public applicationId: string;

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
