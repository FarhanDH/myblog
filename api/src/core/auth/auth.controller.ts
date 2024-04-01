import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { ApiResponse } from '~/common/apiResponse';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.usersService.create(createUserDto);
      return {
        statusCode: 201,
        data: createdUser,
      } satisfies ApiResponse<typeof createdUser>;
    } catch (error) {
      throw new ConflictException('Username already exists');
    }
  }

  @Post('login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const loggedInUser = await this.authService.loginUser(loginUserDto);
      response.cookie('token', loggedInUser.accessToken);
      return {
        statusCode: 201,
        data: loggedInUser,
      } satisfies ApiResponse<typeof loggedInUser>;
    } catch (error) {
      throw new NotFoundException('Your username or password is incorrect');
    }
  }
}
