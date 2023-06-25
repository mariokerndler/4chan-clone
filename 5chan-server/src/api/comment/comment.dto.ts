import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Thread } from '../thread/thread.entity';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  public author: string;

  @IsString()
  @IsNotEmpty()
  public comment: string;

  @IsDefined()
  public thread: Thread;
}
