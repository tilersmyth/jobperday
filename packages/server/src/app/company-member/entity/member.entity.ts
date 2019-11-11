import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
  UpdateDateColumn,
  RelationId,
} from 'typeorm';
import { MemberRoles } from '@jobperday/common';

import { UserEntity } from '../../user/entity';
import { CompanyEntity } from '../../company/entity';

@Entity('company_members')
export class CompanyMemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public role: MemberRoles;

  @Column({ type: 'boolean', default: true })
  public active: boolean;

  @Column({ type: 'boolean', default: false })
  public confirmed: boolean;

  @UpdateDateColumn() updated_at: Date;

  @CreateDateColumn() created_at: Date;

  @ManyToOne(() => UserEntity)
  public user: UserEntity;

  @RelationId((member: CompanyMemberEntity) => member.user)
  public userId: string;

  @ManyToOne(() => CompanyEntity, company => company.members)
  public company: CompanyEntity;
}
