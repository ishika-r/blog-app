import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}
  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const userData = await this.userService.showSingleDataById(userId);
    const userRole = userData.role;
    return this.matchRoles(roles, userRole);
  }
}
