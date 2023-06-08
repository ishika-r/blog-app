import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  category_title: string; // Accept blogId instead of the blog object
}
