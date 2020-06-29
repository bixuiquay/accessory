import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { JwtAuthGuard } from './guards';
import { UserRole } from 'src/database';
import { ClientService } from 'src/client/client.service';
import { CartService } from 'src/cart/cart.service';
import { Client } from 'src/database/entities/client.entity';
import { Cart } from 'src/database/entities/cart.entity';
import { CartProduct } from 'src/database/entities/cart-product.entity';
import { ContextService } from 'src/core/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole, Client, Cart, CartProduct ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7h' },
    }),
  ],
  providers: [AuthService, ClientService, CartService, ContextService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}