import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './blog.entity';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Query } from 'mysql2';

@Injectable()
export class BlogsService {
  // Rest of the code...
  async create(createBlogDto: CreateBlogDto, files: any, userId: any) {
    const images: string[] | any = [];
    if (files) {
      for (const file of files) {
        let destination = file.destination;
        destination = destination.substring(2);
        console.log('destination', destination);
        fs.renameSync(file.path, `./uploads/blog/${file.originalname}`);
        const imagePath = `${process.env.BACKEND_URL}/${destination}/${file.originalname}`;
        images.push(imagePath);
        console.log('images', images);
      }
      createBlogDto.feature_image = JSON.stringify(images);
    } else {
      createBlogDto.feature_image = null;
    }
    console.log(createBlogDto.feature_image);
    createBlogDto.publish_date = new Date();
    const data: any = { ...createBlogDto, user: userId };
    const blog = Blog.create(data);
    await blog.save();
    return { blog: blog, message: 'Blog is successfully added!!' };
  }
  // Update Blog
  async update(
    id: number,
    updateBlogDto: UpdateBlogDto,
    files: any,
    payloadId: number,
  ) {
    console.log('files', files);
    const blog: any = await this.getSingleBlog(id);
    if (blog.user.id === payloadId) {
      const images: string[] | any = JSON.parse(updateBlogDto.feature_image);
      if (files) {
        for (const file of files) {
          let destination = file.destination;
          destination = destination.substring(2);
          console.log('destination', destination);
          // console.log('file', file);
          fs.renameSync(file.path, `./uploads/blog/${file.originalname}`);
          const imagePath = `${process.env.BACKEND_URL}/${destination}/${file.originalname}`;
          images.push(imagePath);
        }
        const stringImages = JSON.stringify(images);
        updateBlogDto.feature_image = stringImages;
      } else {
        // No new images provided, keep the existing ones
        JSON.parse(updateBlogDto.feature_image).push(blog.feature_image);
      }
      // console.log('Updated images', updateBlogDto.feature_image);

      // Save the updated blog entity
      Object.assign(blog, updateBlogDto);
      await blog.save();

      return {
        blog: blog,
        message: `Blog with id ${id} is updated successfully!!`,
      };
    } else {
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);
    }
  }
  async getSingleBlog(id: any) {
    const blog = await Blog.findOne({
      where: { id },
      relations: {
        user: true,
        category: true,
      },
    });
    if (blog) {
      return blog;
    } else {
      return { message: `No blog found with the id ${id}` };
    }
  }

  // Pagination API
  async findAll(query: any) {
    console.log(query);
    const resPerPage = Number(query.limit) || 5;
    const currPage = Number(query.page) || 1;
    const skip = resPerPage * (currPage - 1);
    console.log(skip, currPage, resPerPage);

    const blogs = await Blog.find({
      relations: { user: true, category: true },
      take: resPerPage,
      skip: skip,
    });
    console.log('blogs limit', blogs);
    return blogs;
  }

  // Delete blog
  async delete(id: number, payloadId: any) {
    const blog = await Blog.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
    if (!blog) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    } else if (blog.user.id === payloadId) {
      const files = JSON.parse(blog.feature_image);
      for (const file of files) {
        const originalFileName = path.basename(file);
        if (fs.existsSync(file)) {
          try {
            // Delete files from folder
            fs.unlinkSync(file);
          } catch (error) {
            throw new error();
          }
        } else {
          console.log('User file not found at path:');
        }
      }
      const deleteRow = await Blog.delete(id);
      if (deleteRow.affected === 0) {
        return { message: 'No user id found' };
      } else {
        return { message: `Data from id ${id} is successfully deleted!!` };
      }
    } else {
      return { message: "You can't perform delete action" };
    }
  }

  // // Search API
  async search(query: any) {
    const blogs = await Blog.createQueryBuilder('blog')
      .leftJoinAndSelect('blog.category', 'category')
      .where(
        'blog.title LIKE :query OR blog.content LIKE :query OR category.category_title LIKE :query',
        {
          query: `%${query}%`,
        },
      )
      .getMany();
    console.log('blogs', blogs);
    return blogs;
  }

  // async search(query: any) {
  //   const blogs = await Blog.createQueryBuilder('blog')
  //     .where(
  //       'blog.title LIKE :query OR blog.content LIKE :query OR blog.category LIKE :query ',
  //       {
  //         query: `%${query}%`,
  //       },
  //     )
  //     .getMany();
  //   console.log('blogs', blogs);
  //   return blogs;
  // }
  // async search(@Param('query') query: string): Promise<Blog[]> {
  //   console.log('query', query);
  //   const blogs = await this.blogRepository
  //     .createQueryBuilder('blog')
  //     .where('blog.title LIKE :query', { query: `%${query}%` })
  //     .getMany();
  //   console.log('blogs', blogs);
  //   return blogs;
  // }
}
