import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data);
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param() params: DeleteUserDto) {
    return await this.userService.delete(params);
  }
}
