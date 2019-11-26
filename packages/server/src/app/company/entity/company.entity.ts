import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Length, ValidateIf, Validate } from 'class-validator';

import { CompanyContactEntity } from '../../company-contact';
import { CompanyProfileEntity } from '../../company-profile';
import { CompanyMemberEntity } from '../../company-member';
import { JobEntity } from '../../job/entity';
import { CompanySlugValidator } from './validators';

@Entity('companies')
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  @Length(3, 100, { message: 'must be between 3 and 100 characters' })
  public name: string;

  @Column('text')
  @Length(3, 110, { message: 'must be between 3 and 110 characters' })
  @ValidateIf(o => !o.id)
  @Validate(CompanySlugValidator)
  public slug: string;

  @Column({ type: 'boolean', default: false })
  public setup_complete: boolean;

  @Column({ type: 'int', default: 1 })
  public setup_stage: number;

  @Column({ type: 'boolean', default: false })
  public active: boolean;

  @CreateDateColumn() created_at: Date;

  @OneToOne(() => CompanyProfileEntity, profile => profile.company)
  @JoinColumn()
  public profile: CompanyProfileEntity;

  @OneToOne(() => CompanyContactEntity, contact => contact.company)
  public contact: CompanyContactEntity;

  @OneToMany(() => CompanyMemberEntity, member => member.company)
  public members: CompanyMemberEntity[];

  @OneToMany(() => JobEntity, job => job.company)
  public jobs: JobEntity[];
}
