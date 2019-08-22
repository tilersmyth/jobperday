import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Length, MaxLength } from 'class-validator';

import { JobInstanceEntity } from './job-instance.entity';
import { CompanyEntity } from '../../company/entity/company.entity';

@Entity('jobs')
export class JobEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  @Length(3, 150, { message: 'must be between 3 and 150 characters' })
  public name: string;

  @Column('text')
  public category: string;

  @Column('text')
  @MaxLength(200, { message: 'must not exceed 200 characters' })
  public summary: string;

  @Column('text')
  @MaxLength(5000, { message: 'must not exceed 5,000 characters' })
  public description: string;

  @OneToMany(() => JobInstanceEntity, instance => instance.job)
  public instances: JobInstanceEntity[];

  @ManyToOne(() => CompanyEntity, company => company.jobs)
  public company: CompanyEntity;

  @CreateDateColumn() created_at: Date;
}
