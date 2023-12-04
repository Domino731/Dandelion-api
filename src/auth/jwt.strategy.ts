import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        '102938i109238uzaojkhsdfnaoisjhdniouajsdhfoi97uASYHE89F7YUQW',
    });
  }

  async validate(payload) {
    return { userId: 'test', username: 'test' };
  }
}
