import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './branch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/database/entities/brand.entity';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [
    TypeOrmModule.forFeature([Brand])
  ]
})
export class BrandModule {}
