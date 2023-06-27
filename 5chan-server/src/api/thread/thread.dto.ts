import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Board } from '../board/board.entity';
import { Comment } from '../comment/comment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateThreadDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public subject: string;

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
  public board: Board;

  @ApiProperty()
  public comments: Comment[];
}
