import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Thread } from '../thread/thread.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 10 })
  public author: string;

  @Column({ type: 'varchar', length: 250 })
  public comment: string;

  @Column({ type: 'varchar', length: 250 })
  public file: string;

  @ManyToOne(() => Thread, (thread) => thread.comments)
  public thread: Thread;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
