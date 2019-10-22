import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Length } from 'class-validator';

import { ApplicationFieldEntity } from './application-field.entity';

@Entity('applications')
export class ApplicationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  @Length(3, 150, { message: 'must be between 3 and 150 characters' })
  public title: string;

  @Column('uuid')
  public companyId: string;

  @OneToMany(() => ApplicationFieldEntity, fields => fields.application)
  public fields: ApplicationFieldEntity[];

  @CreateDateColumn() created_at: Date;
}
