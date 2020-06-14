import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DECORATOR_TOKEN_RESOURCE } from 'src/core/decorators';

@Injectable()
export class ResourcesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const resources = this.reflector.get<string[]>(
      DECORATOR_TOKEN_RESOURCE,
      context.getHandler()
    ) || this.reflector.get<string[]>(DECORATOR_TOKEN_RESOURCE, context.getClass());

    if (!resources) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return Boolean(resources.find(x => user.resources.includes(x)));
  }
}
