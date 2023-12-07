import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/CreateUserDto';
import { userUtils } from './user.utils';
import { USER_ERRORS } from './user.const';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    console.log(
      `[UsersService] validateUser, email: ${email}, password: ${password}`,
    );
    const user = await this.userRepo.findOne({ where: { email } });
    if (user) {
      console.log('[UsersService] validateUser: found user', user);
      return { ...user, password: undefined };
    }
    return undefined;
  }

  async create(createUserDto: CreateUserDto) {
    // check if password is strong enough at start
    if (!userUtils.validatePassword(createUserDto.password)) {
      throw new Error(USER_ERRORS.WEAK_PASSWORD);
    }

    const user = await this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
    const { password, ...result } = user;
    return result;
  }
}
