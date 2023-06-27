import { IsNotEmpty, IsString } from 'class-validator';
import { Thread } from '../thread/thread.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public slug: string;

  @ApiProperty()
  public threads: Thread[];
}
