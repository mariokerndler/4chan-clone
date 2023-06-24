import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './board.dto';

@Injectable()
export class BoardService {
  @InjectRepository(Board)
  private readonly repository: Repository<Board>;

  public getBoard(id: number): Promise<Board> {
    return this.repository.findOne({
      where: {
        id: id,
      },
      relations: {
        threads: true,
      },
    });
  }

  public getBoards(): Promise<Board[]> {
    return this.repository.find();
  }

  public createBoard(boardDto: CreateBoardDto): Promise<Board> {
    const board: Board = new Board();

    board.name = boardDto.name;
    board.slug = boardDto.slug;
    board.threads = boardDto.threads;

    return this.repository.save(board);
  }
}
