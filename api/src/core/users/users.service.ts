import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel({
      username: createUserDto.username,
      password: await hashSync(createUserDto.password, genSaltSync(10)),
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { username, _id, ..._ } = await createdUser.save();
    return { username, _id };
  }

  findAll() {
    return `This action returns all users`;
  }

  async getUserByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
