import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/database/entities/client.entity';
import { jwtConstants } from 'src/auth/constants';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [
    TypeOrmModule.forFeature([Client]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7h' },
    }),
  ]
})
export class ClientModule {}
