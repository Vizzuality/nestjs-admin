import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { User } from './entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/api/users')
  getAll(): Promise<User[]> {
    return this.userRepo.find({ relations: ['posts', 'comments'] });
  }
}
