import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto, file: Express.Multer.File, req) {
    const { originalname, path } = file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    fs.rename(path, `uploads\\${parts[0]}` + '.' + ext);

    // save to db
    const createdPost = new this.postModel({
      title: createPostDto.title,
      summary: createPostDto.summary,
      content: createPostDto.content,
      cover: `${parts[0]}` + '.' + ext,
      author: req._id,
    }).save();

    return createdPost;
  }

  async getAll() {
    return await this.postModel
      .find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .exec();
  }

  async getById(id: string) {
    return await this.postModel
      .findById(id)
      .populate('author', ['username'])
      .exec();
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
