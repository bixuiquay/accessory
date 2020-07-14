import { Controller, Body, Get, Post, Put, Param, Delete, Query } from '@nestjs/common';
import { ResourceType } from 'src/database';
import { Resources, Public } from 'src/core/decorators';
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvoiceResponse, InvoiceCreateRequest, InvoicePaginatedRequest } from './invoice.dto';
import { InvoiceService } from './invoice.service';

@ApiTags('invoice')
@Controller('invoices')
export class InvoiceController {
  constructor(
    private readonly service: InvoiceService
  ){}

  @Get('/mine')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my invoice' })
  @ApiOkResponse({ type: InvoiceResponse, description: 'get all invoice ' })
  async getAll(@Query() filter: InvoicePaginatedRequest): Promise<any>{
    return this.service.getAllByClient(filter);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new invoice' })
  @ApiOkResponse({ type: InvoiceResponse, description: 'New invoice' })
  async add(@Body() invoiceRequest: InvoiceCreateRequest): Promise<any>{
    return this.service.add(invoiceRequest);
  }

  // @Put(':id')
  // @ApiBearerAuth()
  // @Resources(ResourceType.Invoice)
  // @ApiOperation({ summary: 'update a invoice' })
  // @ApiOkResponse({ type: InvoiceResponse, description: 'Updated invoice' })
  // async update(@Param('id')id: number, @Body() invoiceRequest: InvoiceCreateRequest): Promise<any>{
  //   return this.service.update(id, {...invoiceRequest});
  // }

  @Resources(ResourceType.Invoice)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete a Invoice' })
  @ApiOkResponse({ type: InvoiceResponse, description: 'delete invoice' })
  async delete(@Param('id')id: number): Promise<any>{
    return await this.service.delete(id);
  }

}
