import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ThreadService } from './thread.service';
import { Thread } from './thread.entity';
import { ThreadDto } from './thread.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'thread', version: '1' })
@ApiTags('Thread')
export class ThreadController {
  @Inject(ThreadService)
  private readonly service: ThreadService;

  @Get(':id')
  public getThread(@Param('id', ParseIntPipe) id: number): Promise<Thread> {
    return this.service.getThread(id);
  }

  @Get()
  @ApiQuery({ name: 'boardId', required: false, type: Number })
  @ApiQuery({ name: 'author', required: false, type: String })
  public getThreadsbyBoardId(
    @Query('boardId') boardId?: number,
    @Query('author') author?: string,
  ): Promise<Thread[]> {
    return this.service.getThreadByQueryParam(boardId, author);
  }

  @Post()
  public createThread(@Body() body: ThreadDto): Promise<Thread> {
    return this.service.createThread(body);
  }

  @Put(':id')
  public updateThread(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ThreadDto,
  ): Promise<Thread> {
    return this.service.updateThread(id, body);
  }

  @Delete(':id')
  public deleteThread(@Param('id', ParseIntPipe) id: number) {
    this.service.deleteThread(id);
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
  public uploadFileForThreadWithId(
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
  ): Promise<Thread> {
    return this.service.uploadImageForThread(id, file.path);
  }
}
