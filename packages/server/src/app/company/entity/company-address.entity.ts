import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
} from 'typeorm';

@Entity('company_addresses')
export class CompanyAddressEntity extends BaseEntity {
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

  @UpdateDateColumn() updated_at: Date;

  @CreateDateColumn() created_at: Date;
}
