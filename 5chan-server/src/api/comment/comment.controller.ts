import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './comment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller({ path: 'comment', version: '1' })
export class CommentController {
  @Inject(CommentService)
  private readonly service: CommentService;

  @Get(':id')
  public getComment(@Param('id', ParseIntPipe) id: number): Promise<Comment> {
    return this.service.getComment(id);
  }

  @Post()
  public createComment(@Body() body: CreateCommentDto): Promise<Comment> {
    return this.service.createComment(body);
  }

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  public uploadFileForCommentWithId(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): Promise<Comment> {
    return this.service.uploadImageForComment(id, file.path);
  }
}
