import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/database/entities/invoice.entity';
import { Product } from 'src/database';
import { ProductInvoice } from 'src/database/entities/product-invoice.entity';
import { Client } from 'src/database/entities/client.entity';
import { ContextService } from 'src/core/services';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, ContextService],
  imports: [
    TypeOrmModule.forFeature([Invoice, Product, ProductInvoice, Client])
  ]
})
export class InvoiceModule {}
