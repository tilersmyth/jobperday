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
  public companyName: string;

  @Column('text')
  @Length(3, 150, { message: 'must be between 3 and 150 characters' })
  public name: string;

  @Column({ type: 'text' })
  @Length(3, 170, { message: 'must be between 3 and 170 characters' })
  public slug: string;

  @Column('text')
  @MaxLength(200, { message: 'must not exceed 200 characters' })
  public summary: string;

  @Column('text')
  @MaxLength(5000, { message: 'must not exceed 5,000 characters' })
  public description: string;

  @Column('text')
  public type: string;

  @Column({ type: 'text', array: true })
  public keywords: string[];

  @OneToMany(() => JobInstanceEntity, instance => instance.job)
  public instances: JobInstanceEntity[];

  @ManyToOne(() => CompanyEntity, company => company.jobs)
  public company: CompanyEntity;

  @CreateDateColumn() created_at: Date;

  @Column('tsvector', { select: false })
  document_with_weights: any;
}
