import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Errors } from 'src/errors';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ReturnUserBlock, ReturnUserDto } from './dto/user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectQueue('user') private readonly userQueue: Queue,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private async isUserExists(email: string): Promise<void> {
    const existedUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (existedUser) throw new BadRequestException(Errors.UserExists);
  }

  async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    await this.isUserExists(createUserDto.email);
    const user = await this.userRepository.save({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    });

    delete user.password;
    this.userQueue.add('user', user, { delay: 10 * 1000 });
    return user;
  }

  async getById(id: string): Promise<ReturnUserBlock> {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!foundUser) throw new BadRequestException(Errors.UserNotFound);
    delete foundUser.password;

    return { statusCode: 200, message: 'SUCCESS', user: foundUser };
  }

  async changeStatus(id: string): Promise<void> {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: Number(id),
      },
    });
    if (!foundUser) throw new BadRequestException(Errors.UserNotFound);
    this.userRepository.save({ ...foundUser, status: true });
  }
}
