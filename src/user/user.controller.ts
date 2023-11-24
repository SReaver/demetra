import axios from 'axios';
import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() creteUserDto: CreateUserDto) {
    return this.userService.create(creteUserDto);
  }

  @Get('/get-user-by-id')
  getUser(@Query('id', ParseIntPipe) userId: string) {
    return this.userService.getById(userId);
  }

  @Get()
  async getproxy() {
    return axios
      .get('http://jsonplaceholder.typicode.com/todos/1', {
        proxy: {
          protocol: 'http',
          host: '45.196.48.9',
          port: 5435,
          auth: {
            username: 'jtzhwqur',
            password: 'jnf0t0n2tecg',
          },
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => console.error(err));
  }
}
