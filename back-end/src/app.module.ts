import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database';
import { AuthModule } from './auth/auth.module';
import { ProductTypeModule } from './product-type/product-type.module';

@Module({
  imports: [ProductModule, DatabaseModule, AuthModule, ProductTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
