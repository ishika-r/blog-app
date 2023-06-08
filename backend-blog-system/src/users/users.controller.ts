import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create
  @Post()
  @UseInterceptors(FileInterceptor('profile'))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.usersService.create(createUserDto, file);
  }

  // Update
  @Patch(':id')
  @UseInterceptors(FileInterceptor('profile'))
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: any,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    let userToUpdate = await this.usersService.showSingleDataById(id);

    const updatedUser = { ...userToUpdate, ...updateUserDto };
    return this.usersService.update(id, updatedUser, file);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.usersService.delete(id);
  }

  // File upload operations
  // Image upload
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() body: CreateUserDto,
    @UploadedFile()
    file: // new ParseFilePipe({
    //   validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
    // }),
    Express.Multer.File,
  ) {
    fs.renameSync(file.path, `./uploads/profile/${file.originalname}`);
    return {
      body,
      file: file.originalname,
    };
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files'))
  multipleuploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    for (const file of files) {
      fs.renameSync(file.path, `./uploads/blog/${file.originalname}`);
    }
  }
  // Update
  // @Patch(':id')
  // async uppdate(@Param('id') id: number, @Body() data: Partial<CreateUserDto>) {
  //   await this.usersService.update(id, data);
  //   console.log('update', id, data);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'User updated successfully',
  //   };
  // }

  // @Patch(':id')
  // @UseInterceptors(FileInterceptor('profile'))
  // async update(
  //   @Param('id') id: number,
  //   @Body() data: Partial<CreateUserDto>,
  //   @UploadedFile() file?: Express.Multer.File,
  // ) {
  //   const user = await this.usersService.showSingleDataById(id); // Assuming you have a method to find a user by ID
  //   console.log('user by id', user);
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //   console.log('data. profile', data.profile);
  //   if (data.profile) {
  //     const oldFilePath = user.profile;
  //     const newFilePath = data.profile;

  //     // Perform file update logic here (e.g., rename or move the file)
  //     // For simplicity, assuming fs.renameSync is used
  //     fs.renameSync(newFilePath, oldFilePath);
  //     console.log('Profile image updated successfully');
  //   }

  //   await this.usersService.update(id, data);

  //   console.log('update', id, data);

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'User updated successfully',
  //   };
  // }
}
