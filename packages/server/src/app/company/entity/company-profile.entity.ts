import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CompanyImageEntity } from './company-image.entity';
import { CompanyEntity } from './company.entity';

@Entity('company_profiles')
export class CompanyProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public profile_image: string;

  @Column('text')
  public cover_image: string;

  @Column('text')
  public about: string;

  @Column('text')
  public business_type: string;

  @OneToOne(() => CompanyEntity, company => company.profile)
  @JoinColumn()
  public company: CompanyEntity;

  @OneToMany(() => CompanyImageEntity, image => image.profile)
  public images: CompanyImageEntity[];

  @UpdateDateColumn() updated_at: Date;

  @CreateDateColumn() created_at: Date;
}
