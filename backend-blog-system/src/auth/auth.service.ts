import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);
    const payload = { userId: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      message: 'You have successfully logged in !!',
    };
  }

  // User profile
  async profile(id: number | any) {
    const singleUser = this.usersService.showSingleDataById(id);
    return singleUser;
  }
  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;
    const user = await this.usersService.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    return user;
  }

  // Get all users (Only access role:Admin)
  findAll() {
    return this.usersService.findAll();
  }

  // Delete user data
  deleteUser(id: number | any) {
    return this.usersService.delete(id);
  }

  // update user data
  update(id: any, updateUserDto: UpdateUserDto, file: any) {
    return this.usersService.update(id, updateUserDto, file);
  }

  userblogs(id: any) {
    return this.usersService.showUserBlogs(id);
  }

  //  For profile page get single user
  async getUserById(id: number, payloadId: number) {
    return this.usersService.getUserById(id, payloadId);
  }
}
