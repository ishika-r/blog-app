import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/blog',
    }),
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
