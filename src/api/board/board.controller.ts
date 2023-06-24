import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './board.dto';

@Controller('board')
export class BoardController {
  @Inject(BoardService)
  private readonly service: BoardService;

  @Get(':id')
  public getBoard(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.service.getBoard(id);
  }

  @Get()
  public getBoards(): Promise<Board[]> {
    return this.service.getBoards();
  }

  @Post()
  public createBoard(@Body() body: CreateBoardDto): Promise<Board> {
    return this.service.createBoard(body);
  }
}
