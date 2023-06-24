import { Module } from '@nestjs/common';
import { ThreadController } from './thread.controller';
import { ThreadService } from './thread.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './thread.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Thread])],
  controllers: [ThreadController],
  providers: [ThreadService],
})
export class ThreadModule {}
