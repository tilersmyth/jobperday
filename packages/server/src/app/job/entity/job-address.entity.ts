import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { JobInstanceEntity } from './job-instance.entity';

@Entity('job_addresses')
export class JobAddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'text', nullable: true })
  public street: string;

  @Column({ type: 'text', nullable: true })
  public street2: string;

  @Column('text')
  public city: string;

  @Column('text')
  public state: string;

  @Column('text')
  public country: string;

  @Column('text')
  public postal_code: string;

  @Column('float')
  public coord_lat: number;

  @Column('float')
  public coord_lng: number;

  @OneToMany(() => JobInstanceEntity, instance => instance.address)
  public instances: JobInstanceEntity[];

  @UpdateDateColumn() updated_at: Date;

  @CreateDateColumn() created_at: Date;
}