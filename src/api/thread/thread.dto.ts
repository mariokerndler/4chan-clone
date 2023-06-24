import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Board } from '../board/board.entity';
import { Comment } from '../comment/comment.entity';

export class CreateThreadDto {
  @IsString()
  @IsNotEmpty()
  public subject: string;

  @IsString()
  @IsNotEmpty()
  public author: string;

  @IsString()
  @IsNotEmpty()
  public comment: string;

  @IsString()
  @IsNotEmpty()
  public file: string;

  @IsDefined()
  public board: Board;

  public comments: Comment[];
}
