import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseCommonEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  public id: number;

  @AutoMap()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  public createdAt!: Date;

  @AutoMap()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  public updatedAt!: Date;

    @DeleteDateColumn({ type: 'timestamptz'})
    public deletedAt!: Date;

  // @AutoMap()
  // @Column({ type: 'boolean', default: 0 })
  // public isDeleted: boolean;
}
