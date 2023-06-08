import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto | any) {
    // return 'This action adds a new category';
    const category = Category.create(createCategoryDto);
    return category.save();
  }

  findAll() {
    return Category.find({
      relations: ['blogs', 'blogs.user'],

      // relations: {
      //   blogs: true,
      // },
    });
    // return `This action returns all categories`;
  }

  async findOne(id: number) {
    // return `This action returns a #${id} category`;
    const category = await Category.findOne({
      where: { id },
      relations: ['blogs', 'blogs.user'],
      // relations: {
      //   blogs: true,
      // },
    });
    if (category) {
      return category;
    } else {
      return { message: `No category found with the ID ${id}` };
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
