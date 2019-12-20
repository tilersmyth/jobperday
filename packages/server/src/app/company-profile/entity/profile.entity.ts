import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
  OneToOne,
  RelationId,
} from 'typeorm';

import { CompanyEntity } from '../../company/entity';
import { ProfileColorsEnum } from '../enums';

@Entity('company_profiles')
export class CompanyProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text', { nullable: true })
  public profile_image: string;

  @Column('text')
  public cover_image: string;

  @Column('text')
  public about: string;

  @Column({ type: 'enum', enum: ProfileColorsEnum })
  public color: string;

  @OneToOne(() => CompanyEntity, company => company.profile)
  public company: CompanyEntity;

  @UpdateDateColumn() updated_at: Date;

  @CreateDateColumn() created_at: Date;
}
