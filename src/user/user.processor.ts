import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Processor('user')
export class UserProcessor {
  constructor(private readonly userService: UserService) {}
  logger = new Logger();

  @Process('user')
  handleTranscode(job: Job) {
    this.userService.changeStatus(job.data.id).then(() => {
      this.logger.debug(`User with id ${job.data.id} updated successfully!`);
    });
  }
}
