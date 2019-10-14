import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
  RelationId,
  ManyToOne,
} from 'typeorm';
import { Length } from 'class-validator';

import { CompanyMemberEntity } from './company-member.entity';
import { CompanyAddressEntity } from './company-address.entity';
import { CompanyProfileEntity } from './company-profile.entity';
import { JobEntity } from '../../job/entity';

@Entity('companies')
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  @Length(3, 100, { message: 'must be between 3 and 100 characters' })
  public name: string;

  @Column({ type: 'text', unique: true })
  @Length(3, 110, { message: 'must be between 3 and 110 characters' })
  public slug: string;

  @Column('text')
  public phone: string;

  @Column({ type: 'boolean', default: false })
  public setup_complete: boolean;

  @Column({ type: 'int', default: 1 })
  public setup_stage: number;

  @Column({ type: 'boolean', default: false })
  public active: boolean;

  @CreateDateColumn() created_at: Date;

  @OneToOne(() => CompanyProfileEntity)
  public profile: CompanyProfileEntity;

  @ManyToOne(() => CompanyAddressEntity)
  public address: CompanyAddressEntity;

  @RelationId((company: CompanyEntity) => company.address)
  public addressId: string;

  @OneToMany(() => CompanyMemberEntity, member => member.company)
  public members: CompanyMemberEntity[];

  @OneToMany(() => JobEntity, job => job.company)
  public jobs: JobEntity[];
}
