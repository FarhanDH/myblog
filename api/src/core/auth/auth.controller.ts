import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '~/common/apiResponse';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtGuard } from './guards/jwt.guard';

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
      response
        .cookie('token', loggedInUser.accessToken, {
          secure: true,
          httpOnly: true,
          sameSite: 'strict',
        })
        .json({
          statusCode: 201,
          data: loggedInUser,
        });
    } catch (error) {
      throw new NotFoundException('Your username or password is incorrect');
    }
  }

  @UseGuards(JwtGuard)
  @Get('checkToken')
  async checkToken(@Request() req) {
    console.log(req.user);
    return {
      statusCode: 200,
      data: req.user,
    } satisfies ApiResponse<string>;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token');
    return {
      statusCode: 200,
      data: null,
    } satisfies ApiResponse<null>;
  }
}
