import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ThreadService } from './thread.service';
import { Thread } from './thread.entity';
import { CreateThreadDto } from './thread.dto';

@Controller('thread')
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
}
