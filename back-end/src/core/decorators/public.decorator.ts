import { SetMetadata } from '@nestjs/common';

export const DECORATOR_TOKEN_PUBLIC = 'isPublic';

export const Public = () => SetMetadata(DECORATOR_TOKEN_PUBLIC, true);