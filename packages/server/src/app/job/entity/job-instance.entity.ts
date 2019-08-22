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

  @Column('date')
  public date: Date;

  @Column('time')
  public start_time: string;

  @Column('time')
  public end_time: string;

  @Column('varchar')
  public pay_rate: string;

  @Column('int')
  public total_openings: number;

  @Column({ type: 'int' })
  public remaining_openings: number;

  @Column('date')
  public apply_deadline: Date;

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
