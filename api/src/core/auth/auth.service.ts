import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schema/users.schema';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { config } from '~/common/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);

    const payload = {
      _id: user._id,
      username: user.username,
    };

    return {
      _id: user._id,
      username: user.username,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '5h',
        secret: config().jwtSecret,
      }),
    };
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const user = (
      await this.usersService.getUserByUsername(loginUserDto.username)
    ).toObject();
    if (user && (await compareSync(loginUserDto.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
