import { Entity, Column, ManyToOne } from 'typeorm';
import { Thread } from '../thread/thread.entity';
import { AbstractEntity } from 'src/common/entities';

@Entity()
export class Comment extends AbstractEntity {
  @Column({ type: 'varchar', length: 10 })
  public author: string;

  @Column({ type: 'varchar', length: 500 })
  public comment: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  public file: string;

  @ManyToOne(() => Thread, (thread) => thread.comments, {
    onDelete: 'CASCADE',
  })
  public thread: Thread;
}
