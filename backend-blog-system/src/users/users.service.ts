import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { Role } from './interface/user.interface';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  // Create user
  async create(createUserDto: CreateUserDto | any, file: any) {
    console.log('file', file);
    if (file) {
      let destination = file.destination;
      destination = destination.substring(2);
      console.log('destination', destination);
      fs.renameSync(file.path, `./uploads/profile/${file.originalname}`);
      createUserDto.profile = `${process.env.BACKEND_URL}/${destination}/${file.originalname}`;
      console.log('Profile', createUserDto.profile);
    } else {
      createUserDto.profile = null;
    }
    const user = User.create(createUserDto);
    const email_exist = await this.findByEmail(user.email);
    const role = user.role;

    if (email_exist) {
      throw new BadRequestException(
        'Email already exists. Please try with another email.',
      );
    }
    if (role !== Role.User && role !== Role.Admin && role === '') {
      throw new BadRequestException(
        'Invalid role. Role must be either "user" or "admin".',
      );
    }
    await user.save();

    delete user.password;
    return { user: user, message: 'User has been created successfully!!' };
    // return user;
  }

  // Update User
  async update(id: any, updateUserDto: UpdateUserDto, file: any) {
    const userToUpdate = await this.showSingleDataById(id);
    if (file) {
      let destination = file.destination;
      destination = destination.substring(2);
      console.log('destination', destination);
      fs.renameSync(file.path, `./uploads/profile/${file.originalname}`);
      updateUserDto.profile = `${process.env.BACKEND_URL}/${destination}/${file.originalname}`;
      console.log('new', updateUserDto.profile);
    } else {
      updateUserDto.profile = userToUpdate.profile;
      console.log('existing', updateUserDto.profile);
    }
    if (!userToUpdate) {
      throw new NotFoundException(`User #${id} not found`);
    }
    Object.assign(userToUpdate, updateUserDto);
    await userToUpdate.save();
    return {
      userToUpdate: userToUpdate,
      message: `User with id ${id} is updated successfully!!`,
    };
  }

  // Display profile page
  async showSingleDataById(id: number | any): Promise<User> {
    const singleUser = await User.findOne({ where: { id } });
    return singleUser;
  }

  // async showUserBlogs(id: any, payloadId: any): Promise<User | any> {
  //   if (Number(id) === Number(payloadId)) {
  //     const userBlog = await User.findOne({
  //       where: { id },
  //       relations: ['blogs', 'blogs.category'],
  //       // relations: { blogs: true },
  //     });
  //     console.log('user blogs', userBlog);
  //     if (userBlog) {
  //       return userBlog;
  //     } else {
  //       return { message: 'No Userdata  Found' };
  //     }
  //   } else {
  //     return { message: 'Unauthorized' };
  //   }
  // }
  async showUserBlogs(id: any): Promise<User | any> {
    const userBlog = await User.findOne({
      where: { id },
      relations: ['blogs', 'blogs.category'],
      // relations: { blogs: true },
    });
    console.log('user blogs', userBlog);
    if (userBlog) {
      return userBlog;
    } else {
      return { message: 'No Userdata  Found' };
    }
  }
  // Display all users
  async findAll(): Promise<User[]> {
    return User.find();
  }
  async findById(id: number | any) {
    return await User.findOne(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  // Delete User

  async delete(id: number | any) {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const filePath = user.profile;
    // Get the original file name
    const originalFileName = path.basename(filePath);
    if (fs.existsSync(filePath)) {
      try {
        // Delete the user's file from the folder
        fs.unlinkSync(filePath);
        console.log('User file deleted successfully');
      } catch (error) {
        console.error('Error deleting user file:', error);
      }
    } else {
      console.log('User file not found at path:', filePath);
    }
    // try {
    //   // Delete the user's file from the folder
    //   fs.unlinkSync(filePath);
    //   console.log('User file deleted successfully');
    // } catch (error) {
    //   console.error('Error deleting user file:', error);
    // }
    const deletedRow = await User.delete(id);

    console.log(deletedRow.affected);
    if (deletedRow.affected === 0) {
      return { message: 'No user id found' };
    } else {
      return { message: `Data from id ${id} is successfully deleted!!` };
    }
  }

  // For profile page get single user
  async getUserById(id: number, payloadId: number) {
    console.log('id', typeof id, typeof payloadId, 'payloadId');
    if (payloadId === Number(id)) {
      const singleUserData = await User.findOne({ where: { id } });
      if (singleUserData) {
        return {
          singleUserData: singleUserData,
          message: `User with id ${id} is here!!`,
        };
      } else {
        return { message: `No record found with id ${id}` };
      }
    } else {
      return { message: `${HttpStatus.UNAUTHORIZED},You can't access` };
    }
  }
}
