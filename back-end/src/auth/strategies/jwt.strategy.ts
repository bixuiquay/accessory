import { Injectable, ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { JwtPayload } from '../auth.dto';
import { AuthService } from '../auth.service';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.findUser(payload.sub);
    if (!user) {
      throw new ForbiddenException();
    }

    return { userId: payload.sub, username: payload.username, resources: payload.resources };
  }
}
