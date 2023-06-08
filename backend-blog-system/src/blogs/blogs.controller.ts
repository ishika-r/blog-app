import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  // Only authencated user can create blogs
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('feature_image'))
  create(
    @Headers() header,
    @Request() req,
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const userId = req.user.userId;
    console.log('userId', userId);
    console.log('files from controller', files);
    return this.blogsService.create(createBlogDto, files, userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSingleBlogUser(@Param('id') id: any) {
    return await this.blogsService.getSingleBlog(id);
  }

  @Get('blog/:id')
  async getSingleBlog(@Param('id') id: any) {
    console.log('id', id);
    return await this.blogsService.getSingleBlog(id);
  }
  // Pagination

  @Get()
  async findAll(@Query() query: any) {
    return this.blogsService.findAll(query);
  }
  // Delete Blog
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id, @Request() req) {
    const payloadId = req.user.userId;
    return this.blogsService.delete(id, payloadId);
  }

  // Update Blog
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('feature_image'))
  async update(
    @Body() updateBlogDto: UpdateBlogDto,
    @Headers() header,
    @Param('id') id: number,
    @Request() req,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log('files', files);
    const payloadId = req.user.userId;
    const blogToUpdate = await this.blogsService.getSingleBlog(id);
    const updatedBlog: any = { ...blogToUpdate, ...updateBlogDto };
    return this.blogsService.update(id, updatedBlog, files, payloadId);
  }

  // Search APi
  @UseGuards(JwtAuthGuard)
  @Get('search/:query')
  async search(@Param('query') query: any) {
    console.log('query', query);
    return this.blogsService.search(query);
  }
}
