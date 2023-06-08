import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles/roles.decorator';
import { Role } from 'src/users/interface/user.interface';
import { RoleGuard } from './role/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Success';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    const userId = req.user.userId;
    return this.authService.profile(userId);
    // return 'this is profile page';
  }
  // Only accessible by Admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Get('users')
  findAll() {
    return this.authService.findAll();
  }

  // Only accessible by Admin
  // Delete User
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id) {
    return this.authService.deleteUser(id);
  }

  // Only accessible by admin
  @UseGuards(JwtAuthGuard)
  // @Roles(Role.Admin)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('profile'))
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('file', file, updateUserDto);
    let userToUpdate = await this.authService.profile(id);
    const updatedUser = { ...userToUpdate, ...updateUserDto };
    return this.authService.update(id, updatedUser, file);
  }

  // Get All the blogs
  // @UseGuards(JwtAuthGuard)
  @Get('blogs/:id')
  userBlog(@Param('id') id: any, @Request() req) {
    // const payloadId = req.user.userId;
    console.log('id', id);
    return this.authService.userblogs(id);
  }
  //  For profile page get single user
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: number, @Request() req) {
    console.log('request', req.user.userId);
    const payloadId = req.user.userId;
    console.log('id from params', id);
    return this.authService.getUserById(id, payloadId);
  }
}
