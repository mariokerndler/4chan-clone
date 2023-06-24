import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { ThreadModule } from './thread/thread.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, BoardModule, ThreadModule, CommentModule],
})
export class ApiModule {}
