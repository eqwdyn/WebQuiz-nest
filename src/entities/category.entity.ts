import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Quiz, (quiz) => quiz.category, {
    cascade: true,
  })
  quizes?: Quiz[];

  @Column({ type: 'varchar', nullable: false })
  title!: string;

  @Column({ type: 'varchar', nullable: false })
  iconUrl!: string;

  @Column({ type: 'int', default: 0 })
  questionsCount!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
