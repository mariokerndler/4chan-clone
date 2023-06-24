import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Board } from '../board/board.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public subject: string;

  @Column({ type: 'varchar', length: 10 })
  public author: string;

  @Column({ type: 'varchar', length: 250 })
  public comment: string;

  @Column({ type: 'varchar', length: 250 })
  public file: string;

  @ManyToOne(() => Board, (board) => board.threads)
  public board: Board;

  @OneToMany(() => Comment, (comment) => comment.thread, {
    cascade: true,
  })
  public comments: Comment[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
