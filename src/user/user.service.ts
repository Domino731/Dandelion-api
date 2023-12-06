import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { userUtils } from './user.utils';
import { USER_ERRORS } from './user.const';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findOne(id: number) {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async find() {
    return await this.userRepo.find();
  }

  async findOneWithUserName(userName: string) {
    return await this.userRepo.findOne({ where: { email: userName } });
  }

  async create(createUserDto: CreateUserDto) {
    // check if password is strong enough at start
    if (!userUtils.validatePassword(createUserDto.password)) {
      throw new Error(USER_ERRORS.WEAK_PASSWORD);
    }
    console.log('create');
    const user = await this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
    const { password, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }
}
