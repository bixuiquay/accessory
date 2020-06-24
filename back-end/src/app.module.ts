import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ChildCategoryModule } from './child-category/child-category.module';
import { BrandModule } from './brand/branch.module';
import { ImageModule } from './image/image.module';
import { ClientModule } from './client/client.module';
// import { CartModule } from './cart/cart.module';

@Module({
  imports: [ClientModule, ProductModule, DatabaseModule, AuthModule, CategoryModule, ChildCategoryModule, BrandModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { } 
