import { Reflector } from '@nestjs/core';

import { JwtAuthGuard } from './jwt-auth.guard';
import { ResourcesGuard } from './resources.guard';

export const GlobalGuards = (reflector: Reflector) => {
  return [
    new JwtAuthGuard(reflector),
    new ResourcesGuard(reflector),
  ];
};

export * from './jwt-auth.guard';
export * from './resources.guard';
