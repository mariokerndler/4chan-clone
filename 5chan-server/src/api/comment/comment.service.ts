import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  @InjectRepository(Comment)
  private readonly repository: Repository<Comment>;

  public getComment(id: number): Promise<Comment> {
    return this.repository.findOne({
      where: { id: id },
    });
  }

  public createComment(commentDto: CreateCommentDto): Promise<Comment> {
    const comment: Comment = new Comment();

    comment.author = commentDto.author;
    comment.comment = commentDto.comment;
    comment.thread = commentDto.thread;

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
