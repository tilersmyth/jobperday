import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

import { CompanyEntity } from './company.entity';
import { MemberRoles } from '../../_helpers/company';

@Entity('company_members')
export class CompanyMemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public userId: string;

  @Column('text')
  public role: MemberRoles;

  @Column({ type: 'boolean', default: true })
  public active: boolean;

  @Column({ type: 'boolean', default: false })
  public confirmed: boolean;

  @UpdateDateColumn() updated_at: Date;

  @CreateDateColumn() created_at: Date;

  @ManyToOne(() => CompanyEntity, company => company.members)
  public company: CompanyEntity;
}
