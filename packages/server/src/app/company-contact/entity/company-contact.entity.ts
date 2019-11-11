import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { AddressEntity } from '../../address';
import { CompanyEntity } from '../../company/entity';

@Entity('company_contacts')
export class CompanyContactEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public phone: string;

  @ManyToOne(() => AddressEntity)
  public address: AddressEntity;

  @OneToOne(() => CompanyEntity, company => company.contact)
  @JoinColumn()
  public company: CompanyEntity;

  @CreateDateColumn() created_at: Date;
}
