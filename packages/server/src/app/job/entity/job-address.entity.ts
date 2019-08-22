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

  @Column('text')
  public phone: string;

  @Column('text')
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

  @Column({
    type: 'geometry',
    nullable: true,
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  public coords: string;

  @OneToMany(() => JobInstanceEntity, instance => instance.address)
  public instances: JobInstanceEntity[];

  @UpdateDateColumn() updated_at: Date;

  @CreateDateColumn() created_at: Date;
}
