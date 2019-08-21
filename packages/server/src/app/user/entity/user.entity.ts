import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import {
  IsEmail,
  Length,
  Validate,
  ValidateIf,
  MinLength,
} from 'class-validator';

import { IsUserAlreadyExist } from '../user.validator';
import { hashPassword } from '../../_helpers';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  @Length(3, 50, { message: 'must be between 3 and 50 characters' })
  public first_name: string;

  @Column('text')
  @Length(3, 50, { message: 'must be between 3 and 50 characters' })
  public last_name: string;

  @Column('varchar', { length: 255 })
  @IsEmail({}, { message: 'invalid format' })
  @ValidateIf(o => !o.id)
  @Validate(IsUserAlreadyExist)
  public email: string;

  @Column('text')
  @MinLength(8, { message: '8 character minimum' })
  public password: string;

  @Column({ type: 'boolean', default: false })
  public is_verified: boolean;

  @CreateDateColumn() created_at: Date;

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    this.password = hashPassword(this.password);
  }
}
