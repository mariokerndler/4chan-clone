import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './comment.dto';

@Controller('comment')
export class CommentController {
  @Inject(CommentService)
  private readonly service: CommentController;

  @Get(':id')
  public getComment(@Param('id', ParseIntPipe) id: number): Promise<Comment> {
    return this.service.getComment(id);
  }

  @Post()
  public createComment(@Body() body: CreateCommentDto): Promise<Comment> {
    return this.service.createComment(body);
  }
}
