import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
} from 'typeorm';

import { AddressRefTypeEnum } from '../enums';

@Entity('addresses')
export class AddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

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

  @Column('float')
  public coord_lat: number;

  @Column('float')
  public coord_lng: number;

  @Column({
    type: 'enum',
    enum: AddressRefTypeEnum,
  })
  public refType: AddressRefTypeEnum;

  @Column('uuid')
  public refId: string;

  @UpdateDateColumn() updated_at: Date;

  @CreateDateColumn() created_at: Date;
}
