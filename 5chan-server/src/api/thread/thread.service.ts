import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Thread } from './thread.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateThreadDto } from './thread.dto';

@Injectable()
export class ThreadService {
  @InjectRepository(Thread)
  private readonly repository: Repository<Thread>;

  public getThread(id: number): Promise<Thread> {
    return this.repository.findOne({
      where: {
        id: id,
      },
      relations: {
        board: true,
        comments: true,
      },
    });
  }

  public getThreads(): Promise<Thread[]> {
    return this.repository.find();
  }

  public createThread(threadDto: CreateThreadDto): Promise<Thread> {
    const thread = new Thread();

    thread.author = threadDto.author;
    thread.board = threadDto.board;
    thread.comment = threadDto.comment;
    thread.comments = threadDto.comments;
    thread.file = threadDto.file;
    thread.subject = threadDto.subject;

    return this.repository.save(thread);
  }
}