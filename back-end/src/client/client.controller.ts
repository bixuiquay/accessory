import { Controller, Body, Get, Post, Put, Param, Delete } from '@nestjs/common';
import { ResourceType } from 'src/database';
import { Resources, Public } from 'src/core/decorators';
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { ClientCreateRequest, ClientResponse, ClientRegister, ClientLogin, ClientProfileRequest } from './client.dto';
import { ClientService } from './client.service';

@ApiTags('client')
@Controller('clients')
export class ClientController {

  constructor(private readonly service: ClientService){}

  @ApiBearerAuth()
  @Get('/profile')
  @ApiOperation({ summary: 'Get profile client' })
  @ApiOkResponse({ type: ClientResponse, description: 'get profile client ' })
  async getAll(): Promise<any>{
    return this.service.getProfile();
  }

  @Public()
  @Post('/register')
  @ApiOperation({ summary: 'register a new account' })
  @ApiCreatedResponse({ type: Object, description: 'The user info' })
  async register(@Body() clientRegister: ClientRegister) {
    return this.service.register(clientRegister);
  }

  @ApiBearerAuth()
  @Put('/update-profile')
  @ApiOperation({ summary: 'update a account' })
  @ApiCreatedResponse({ type: Object, description: 'The user info' })
  async updateProfile(@Body() clientProfile: ClientProfileRequest) {
    return this.service.updateProfile(clientProfile);
  }

  @Public()
  @Post('/login')
  @ApiOperation({ summary: 'Log in by account' })
  @ApiCreatedResponse({ type: Object, description: 'The tokens { accessToken } info' })
  async login(@Body() clientLogin: ClientLogin) {
    return this.service.login(clientLogin);
  }
}