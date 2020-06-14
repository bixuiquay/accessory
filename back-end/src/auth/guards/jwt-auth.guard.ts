import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { User } from 'src/database/entities/user.entity';
import { jwtConstants } from '../constants';
import { DECORATOR_TOKEN_PUBLIC } from 'src/core/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Constructor
   */
  constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * Override canActivate
   *
   * @param  {ExecutionContext} context   The context
   * @return {boolean | Promise<boolean> | Observable<boolean>}
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      DECORATOR_TOKEN_PUBLIC,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const token = this.extractJWT(request);

    if (isPublic) {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException();
    }

    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  /**
   * Handle request
   *
   * @param  {any} err    The error info
   * @param  {User} user  The user info
   * @param  {any} info   The other info
   * @return {any}
   */
  handleRequest(err: any, user: User, info: any): any {
    if (err || !user) {
      console.log('JWT Guard > handleRequest', err, `${info}`);

      throw err || new UnauthorizedException();
    }

    return user;
  }

  /**
   * Extract JWT
   *
   * @param  {Request} request    The request info
   * @return {string}             The extracted token
   */
  private extractJWT(request: any): string {
    if (request.headers) {
      const token = (request.headers.authorization || '')
        .replace('bearer ', '')
        .replace('Bearer ', '');

      if (jwt && token) {
        jwt.verify(token, jwtConstants.secret, (err, decoded) => {
          // if everything is good, save to request for use in other routes
          if (!err && decoded) {
            request.user = decoded;
          }
        });
      }

      return token;
    }
  }

  /**
   * Extract ApiKey from headers
   * @param request http request
   */
  private extractApiKey(request: any): string {
    if (request.headers) {
      return request.headers.apikey;
    }
  }
}
