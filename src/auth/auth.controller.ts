import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { registerErrorFactory } from './auth.utils';
import { JwtService } from '@nestjs/jwt';

// 	"password": "qwertyqwerty123@/AA",
// 	"email": "janusz22A2@gmail.com",
// 	"nick": "test190238123A"

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.body);
  }

  @Post('/register')
  async registerUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      const payload = {
        ...user,
        ...this.authService.createTokens(user.email, user.nick),
      };
      return res.status(HttpStatus.CREATED).json(payload);
    } catch (e) {
      const error = registerErrorFactory(e);
      if (!error) return res.status(500).json({ message: e.message });
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @UseGuards(RefreshJwtGuard)
  @Post('/refresh')
  async refrshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
