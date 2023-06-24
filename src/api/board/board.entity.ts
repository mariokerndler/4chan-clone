import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Thread } from '../thread/thread.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 10 })
  public slug: string;

  @OneToMany(() => Thread, (thread) => thread.board, {
    cascade: true,
  })
  public threads: Thread[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
