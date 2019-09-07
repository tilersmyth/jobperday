import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

import { CompanyProfileEntity } from './company-profile.entity';

@Entity('company_images')
export class CompanyImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public path: string;

  @Column('text')
  public description: string;

  @ManyToOne(() => CompanyProfileEntity, profile => profile.images)
  public profile: CompanyProfileEntity;

  @CreateDateColumn() created_at: Date;
}
