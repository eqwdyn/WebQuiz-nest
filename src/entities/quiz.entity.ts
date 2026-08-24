import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity({ name: 'quizes' })
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Category, (cat) => cat.quizes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @Column({ type: 'varchar', nullable: false })
  question!: string;

  @Column({ type: 'json', nullable: false })
  answers!: string;

  @Column({ type: 'varchar', nullable: false })
  correctAnswer!: string;

  @Column({ type: 'varchar', nullable: false })
  explanation!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
