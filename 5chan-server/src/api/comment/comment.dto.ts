import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Thread } from '../thread/thread.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public author: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public comment: string;

  @IsDefined()
  @ApiProperty()
  public thread: Thread;
}
