import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CommentDto } from './comment.dto';
import * as fs from 'fs';

@Injectable()
export class CommentService {
  @InjectRepository(Comment)
  private readonly repository: Repository<Comment>;

  public async getComment(id: number): Promise<Comment> {
    return this.repository.findOne({
      where: { id: id },
    });
  }

  public async createComment(commentDto: CommentDto): Promise<Comment> {
    const comment: Comment = new Comment();

    comment.author = commentDto.author;
    comment.comment = commentDto.comment;
    comment.thread = commentDto.thread;

    return this.repository.save(comment);
  }

  public async deleteComment(id: number): Promise<void> {
    const comment = await this.getComment(id);
    if (comment.file) {
      await fs.unlink(comment.file, (err) => {
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

  public async updateComment(
    id: number,
    updatedCommentDto: CommentDto,
  ): Promise<Comment> {
    const comment = await this.getComment(id);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    comment.author = updatedCommentDto.author || comment.author;
    comment.comment = updatedCommentDto.comment || comment.comment;
    comment.thread = updatedCommentDto.thread || comment.thread;

    return this.repository.save(comment);
  }

  public async uploadImageForComment(
    id: number,
    path: string,
  ): Promise<Comment> {
    const comment = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    comment.file = path;

    return this.repository.save(comment);
  }
}
