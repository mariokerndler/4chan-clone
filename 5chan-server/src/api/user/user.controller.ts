import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { PageOptionsDto, PageDto } from 'src/common/dtos';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorators';

@Controller({ path: 'user', version: '1' })
@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUser(id);
  }

  @Get()
  @ApiPaginatedResponse(UserDto)
  async getUsers(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserDto>> {
    return this.service.getUsers(pageOptionsDto);
  }

  @Post()
  public createUser(@Body() body: UserDto): Promise<User> {
    return this.service.createUser(body);
  }
}
