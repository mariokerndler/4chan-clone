import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Thread } from './thread.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadDto } from './thread.dto';
import * as fs from 'fs';

@Injectable()
export class ThreadService {
  @InjectRepository(Thread)
  private readonly repository: Repository<Thread>;

  public async getThread(id: number): Promise<Thread> {
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

  public async getThreadByQueryParam(
    boardId?: number,
    author?: string,
  ): Promise<Thread[]> {
    const query = this.repository.createQueryBuilder('thread');

    if (boardId && author) {
      query
        .where('thread.boardId = :boardId', { boardId })
        .andWhere('thread.author LIKE :author', { author: `%${author}%` });
    } else if (boardId) {
      query.where('thread.boardId = :boardId', { boardId });
    } else if (author) {
      query.where('thread.author LIKE :author', { author: `%${author}%` });
    } else {
      return this.repository.find();
    }

    const threads = await query.getMany();
    return threads;
  }

  public async createThread(threadDto: ThreadDto): Promise<Thread> {
    const thread = new Thread();

    thread.author = threadDto.author;
    thread.board = threadDto.board;
    thread.comment = threadDto.comment;
    thread.comments = threadDto.comments;
    thread.subject = threadDto.subject;

    return this.repository.save(thread);
  }

  public async deleteThread(id: number): Promise<void> {
    const thread = await this.getThread(id);
    if (thread.file) {
      await fs.unlink(thread.file, (err) => {
        if (err) {
          console.log(err);
        } else {
          this.repository.delete(id);
        }
      });
    } else {
      this.repository.delete(id);
    }
  }

  public async updateThread(
    id: number,
    updatedThreadDto: ThreadDto,
  ): Promise<Thread> {
    const thread = await this.getThread(id);

    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    thread.author = updatedThreadDto.author || thread.author;
    thread.board = updatedThreadDto.board || thread.board;
    thread.comment = updatedThreadDto.comment || thread.comment;
    thread.comments = updatedThreadDto.comments || thread.comments;
    thread.subject = updatedThreadDto.subject || thread.subject;

    return this.repository.save(thread);
  }

  public async uploadImageForThread(id: number, path: string): Promise<Thread> {
    const thread = await this.repository.findOne({
      where: {
        id: id,
      },
      relations: {
        board: true,
        comments: true,
      },
    });

    thread.file = path;

    return this.repository.save(thread);
  }
}
