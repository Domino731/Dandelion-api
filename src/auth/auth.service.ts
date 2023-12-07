import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/createUserDto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneWithUserName(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  createTokens(email: string, nick: string) {
    const payload = {
      email: email,
      sub: {
        name: nick,
      },
    };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async login(user: User) {
    return {
      ...user,
      ...this.createTokens(user.email, user.password),
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return user;
    } catch (e) {
      return e;
    }
  }

  async refreshToken(user: User) {
    const payload = {
      email: user.email,
      sub: {
        name: user.nick,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
