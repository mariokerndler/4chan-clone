import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  @InjectRepository(Comment)
  private readonly repository: Repository<Comment>;

  public getComment(id: number): Promise<Comment> {
    const options: FindOneOptions<Comment> = {
      where: { id: id },
    };

    return this.repository.findOne({
      where: { id: id },
    });
  }

  public createComment(commentDto: CreateCommentDto): Promise<Comment> {
    const comment: Comment = new Comment();

    comment.author = commentDto.author;
    comment.comment = commentDto.comment;
    comment.file = commentDto.file;
    comment.thread = commentDto.thread;

    return this.repository.save(comment);
  }
}
