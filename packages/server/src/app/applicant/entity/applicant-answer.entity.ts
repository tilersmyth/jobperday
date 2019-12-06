import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

import { ApplicantEntity } from './applicant.entity';
import { ApplicationFieldEntity } from '../../application/entity';

@Entity('applicant_answers')
export class ApplicantAnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public response: string;

  @ManyToOne(() => ApplicantEntity, applicant => applicant.answers)
  public applicant: ApplicantEntity;

  @ManyToOne(() => ApplicationFieldEntity)
  public field: ApplicationFieldEntity;

  @CreateDateColumn() created_at: Date;
}
