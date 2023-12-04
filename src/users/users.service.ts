import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  create() {
    // const user = this.userRepository.create({
    //   lastName: 'test',
    //   isActive: false,
    //   firstName: 'test123',
    //   country: '123',
    // });
    // return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findByEmail(email) {
    return this.userRepository.findOneBy({ email });
  }
}
