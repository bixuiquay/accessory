import { SetMetadata } from '@nestjs/common';

export const DECORATOR_TOKEN_PERMISSIONS = 'permissions';

export const Permissions = (...permissions: string[]) => SetMetadata(DECORATOR_TOKEN_PERMISSIONS, permissions);