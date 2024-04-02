import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '~/common/apiResponse';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @Request() req,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|svg|tiff|webp|gif)$/,
        })
        .addMaxSizeValidator({ maxSize: 1000000 })
        .build({ fileIsRequired: false }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const createdPost = await this.postsService.create(
        createPostDto,
        file,
        req.user,
      );
      return {
        statusCode: 201,
        data: createdPost,
      } satisfies ApiResponse<typeof createdPost>;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get()
  async getAll() {
    const posts = await this.postsService.getAll();
    return {
      statusCode: 200,
      data: posts,
    } satisfies ApiResponse<typeof posts>;
  }

  @Get(':id')
  async getByid(@Param('id') id: string) {
    const post = await this.postsService.getById(id);
    return {
      statusCode: 200,
      data: post,
    } satisfies ApiResponse<typeof post>;
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|svg|tiff|webp|gif)$/,
        })
        .addMaxSizeValidator({ maxSize: 1000000 })
        .build({ fileIsRequired: false }),
    )
    file: Express.Multer.File,
  ) {
    console.log(req.user);
    return await this.postsService.update(id, req.user, updatePostDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
