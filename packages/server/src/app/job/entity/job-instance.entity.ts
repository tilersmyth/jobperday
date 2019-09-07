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
import { JobAddressEntity } from './job-address.entity';

@Entity('job_instances')
export class JobInstanceEntity extends BaseEntity {
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

  @Column('timestamp')
  public apply_deadline: Date;

  @Column({
    type: 'geometry',
    nullable: true,
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  public location: object;

  @ManyToOne(() => JobEntity, job => job.instances)
  public job: JobEntity;

  @ManyToOne(() => JobAddressEntity, address => address.instances)
  public address: JobAddressEntity;

  @CreateDateColumn() created_at: Date;

  @BeforeInsert()
  setRemainingOpenings() {
    this.remaining_openings = this.total_openings;
  }
}
