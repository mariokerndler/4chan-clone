import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Exclude()
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Exclude()
  public updatedAt: Date;
}
