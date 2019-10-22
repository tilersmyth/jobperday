import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Length } from 'class-validator';

import { ApplicationEntity } from './application.entity';
import { ApplicationFieldTypes } from '../types';

@Entity('application_fields')
export class ApplicationFieldEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  @Length(5, 300, { message: 'must be between 5 and 300 characters' })
  public question: string;

  @Column('boolean', { default: true })
  public required: boolean;

  @Column('text')
  public type: ApplicationFieldTypes;

  @Column({ type: 'text', array: true })
  public options: string[] = [];

  @ManyToOne(() => ApplicationEntity, application => application.fields)
  public application: ApplicationEntity;

  @CreateDateColumn() created_at: Date;
}
