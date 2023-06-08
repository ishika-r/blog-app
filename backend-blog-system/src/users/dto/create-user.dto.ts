import { IsEmail, IsNotEmpty, IsEmpty } from 'class-validator';
import { Role } from '../interface/user.interface';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  mobile_number: number;
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  role: Role;
  
  @IsEmpty()
  profile: string;
}
