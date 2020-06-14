import { ApiOperation, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginRequest, RegisterRequest, UserRoleRequest } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { Public } from 'src/core/decorators';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  @ApiOperation({ summary: 'Log in by account' })
  @ApiCreatedResponse({ type: Object, description: 'The tokens { accessToken } info' })
  async login(@Body() loginRequest: LoginRequest) {
    return this.authService.login(loginRequest);
  }

  @Public()
  @Post('/register')
  @ApiOperation({ summary: 'register a new account' })
  @ApiCreatedResponse({ type: Object, description: 'The user info' })
  async register(@Body() registerRequest: RegisterRequest) {
    return this.authService.register(registerRequest);
  }

  @Public()
  @Post('/create-user-role')
  @ApiOperation({ summary: 'register a new user role' })
  @ApiCreatedResponse({ type: Object, description: 'The new user role' })
  async createUserRole(@Body() userRoleRequest: UserRoleRequest) {
    return this.authService.createUserRole(userRoleRequest);
  }

  @Get('/profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get user profile' })
  @ApiCreatedResponse({ type: Object, description: 'The user profile info' })
  getProfile(@Request() req) {
    return req.user;
  }
}
