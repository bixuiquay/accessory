import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/database/entities/client.entity';
import { jwtConstants } from 'src/auth/constants';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/database/entities/cart.entity';

@Module({
  controllers: [ClientController],
  providers: [ClientService, CartService],
  imports: [
    TypeOrmModule.forFeature([Client, Cart]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7h' },
    }),
  ]
})
export class ClientModule {}
