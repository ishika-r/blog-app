import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decodedToken: any = this.jwtService.verify(token);
      // auth header
      //  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY4NDkwODg3Mn0.QVQjUe6yCkv5nZoZFpRW_7O0Af96846sMR1sY4YbJrA
      //   console.log('auth header', authHeader);
      // token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY4NDkwODg3Mn0.QVQjUe6yCkv5nZoZFpRW_7O0Af96846sMR1sY4YbJrA
      //   console.log('token', token);
      //   decodedToken { userId: 3, iat: 1684908872 }
      //   console.log('decodedToken', decodedToken);

      if (decodedToken && decodedToken.userId) {
        // req.user.userId = decodedToken.userId;
        req.user = {
          userId: decodedToken.userId,
        };
        // console.log('requ user', req.user);
      }
    }
    next();
  }
}
