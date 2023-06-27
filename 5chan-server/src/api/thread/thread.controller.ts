import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ThreadService } from './thread.service';
import { Thread } from './thread.entity';
import { CreateThreadDto } from './thread.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller({ path: 'thread', version: '1' })
export class ThreadController {
  @Inject(ThreadService)
  private readonly service: ThreadService;

  @Get(':id')
  public getThread(@Param('id', ParseIntPipe) id: number): Promise<Thread> {
    return this.service.getThread(id);
  }

  @Get()
  public getThreads(): Promise<Thread[]> {
    return this.service.getThreads();
  }

  @Post()
  public createThread(@Body() body: CreateThreadDto): Promise<Thread> {
    return this.service.createThread(body);
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
