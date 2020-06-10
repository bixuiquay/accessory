import { Controller, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@ApiResponse({ status: HttpStatus.OK })
@ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden space' })
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'You are not authorized' })
@Controller()
export class BaseController { }