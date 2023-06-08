import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/users/user.entity';
import { Category } from 'src/categories/category.entity';

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  // @Column()
  // category_title: string;

  @ManyToOne(() => Category, (category) => category.blogs) // Specify the Category entity and the inverse relation
  category: Category; // Use the Category entity as the type for the foreign key

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;

  @Column()
  publish_date: Date;

  @Column('text')
  feature_image: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
