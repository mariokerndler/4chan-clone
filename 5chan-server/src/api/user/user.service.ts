import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { PageOptionsDto, PageDto, PageMetaDto } from 'src/common/dtos';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUser(id: number): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { id: id },
    };
    return this.repository.findOne(options);
  }

  public async getUsers(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserDto>> {
    const queryBuilder = this.repository.createQueryBuilder('user');

    queryBuilder
      .orderBy('user.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  public createUser(body: UserDto): Promise<User> {
    const user: User = new User();

    user.name = body.name;

    return this.repository.save(user);
  }
}
