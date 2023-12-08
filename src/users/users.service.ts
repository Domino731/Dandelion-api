import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto';
import { userUtils } from './user.utils';
import { USER_ERRORS } from './user.const';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return { ...user, password: undefined };
    }
    return undefined;
  }

  async create(createUserDto: CreateUserDto) {
    // check if password is strong enough at start
    if (!userUtils.validatePassword(createUserDto.password)) {
      throw new Error(USER_ERRORS.WEAK_PASSWORD);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = await this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });
    await this.userRepo.save(user);
    const { password, ...result } = user;
    return result;
  }
}
