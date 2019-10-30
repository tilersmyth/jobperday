import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('company_images')
export class CompanyImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public filename: string;

  @Column('text')
  public path: string;

  @Column('text', { nullable: true })
  public thumb: string;

  @Column('text')
  public awsKey: string;

  @Column('uuid')
  public companyId: string;

  @CreateDateColumn() created_at: Date;
}
