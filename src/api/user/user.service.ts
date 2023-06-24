import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

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

  public createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.name = body.name;

    return this.repository.save(user);
  }
}
