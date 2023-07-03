import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Board } from '../board/board.entity';
import { Comment } from '../comment/comment.entity';
import { AbstractEntity } from 'src/common/entities';

@Entity()
export class Thread extends AbstractEntity {
  @Column({ type: 'varchar', length: 250 })
  public subject: string;

  @Column({ type: 'varchar', length: 10 })
  public author: string;

  @Column({ type: 'varchar', length: 500 })
  public comment: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  public file: string;

  @ManyToOne(() => Board, (board) => board.threads)
  public board: Board;

  @OneToMany(() => Comment, (comment) => comment.thread, {
    cascade: true,
  })
  public comments: Comment[];
}
