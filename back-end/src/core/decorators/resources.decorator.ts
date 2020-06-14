import { SetMetadata } from '@nestjs/common';
import { ResourceType } from 'src/database/entities/user-role.entity';

export const DECORATOR_TOKEN_RESOURCE = 'resources';

export const Resources = (...resources: ResourceType[]) => SetMetadata(DECORATOR_TOKEN_RESOURCE, resources);