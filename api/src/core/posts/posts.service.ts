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
    const createdPost = await new this.postModel({
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

  async update(
    id: string,
    req,
    updatePostDto: UpdatePostDto,
    file?: Express.Multer.File,
  ) {
    // check if the user is owner of the post
    const checkPost = await this.getById(id);
    if (checkPost.author.username === req.username) {
      let newPath;
      if (file) {
        const { originalname, path } = file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = `${parts[0]}` + '.' + ext;
        fs.rename(path, `uploads\\${newPath}`);
      }
      // save to db
      const updatedPost = await this.postModel
        .findByIdAndUpdate(
          id,
          {
            title: updatePostDto.title,
            summary: updatePostDto.summary,
            content: updatePostDto.content,
            cover: newPath ? newPath : checkPost.cover,
            author: req._id,
          },
          { new: true },
        )
        .exec();

      return updatedPost;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
