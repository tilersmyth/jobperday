import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { ApplicantDecisionEnum, ApplicantStatusEnum } from '../enums';
import { JobPostingEntity } from '../../job-posting/entity';
import { UserEntity } from '../../user/entity';
import { ApplicantAnswerEntity } from './applicant-answer.entity';

@Entity('applicants')
export class ApplicantEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'enum',
    enum: ApplicantStatusEnum,
    default: ApplicantStatusEnum.open,
  })
  public status: ApplicantStatusEnum;

  @Column({ type: 'enum', enum: ApplicantDecisionEnum, nullable: true })
  public decision: ApplicantDecisionEnum;

  @Column('uuid')
  public companyId: string;

  @Column('uuid')
  public jobId: string;

  @OneToMany(() => ApplicantAnswerEntity, answer => answer.applicant)
  public answers: ApplicantAnswerEntity[];

  @ManyToOne(() => JobPostingEntity)
  public posting: JobPostingEntity;

  @ManyToOne(() => UserEntity)
  public candidate: UserEntity;

  @CreateDateColumn() created_at: Date;
}
