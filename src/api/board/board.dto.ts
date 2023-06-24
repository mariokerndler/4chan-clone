import { IsNotEmpty, IsString } from 'class-validator';
import { Thread } from '../thread/thread.entity';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public slug: string;

  public threads: Thread[];
}
