import { Blog } from 'src/blogs/blog.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_title: string;

  @OneToMany(() => Blog, (blog) => blog.category) // Specify the Blog entity and the inverse relation
  blogs: Blog[]; // Add this property to establish the bidirectional relationship

  @Column()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
