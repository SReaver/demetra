import { CreateUserDto } from './create-user.dto';

export interface ReturnUserDto extends Omit<CreateUserDto, 'password'> {
  id: number;
  status: boolean;
}

export interface ReturnUserBlock {
  statusCode: number;
  message: string;
  user: ReturnUserDto;
}
