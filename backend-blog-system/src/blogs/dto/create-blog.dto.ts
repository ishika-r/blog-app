import { IsEmail, IsNotEmpty, IsEmpty } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  category: number;

  @IsNotEmpty()
  userId: number; // Accept userId instead of the user object

  @IsNotEmpty()
  publish_date: Date;

  @IsNotEmpty()
  feature_image: string;
}
