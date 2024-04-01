import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/users/entities/users.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Entity({ name: 'offers' })
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    default: 0,
    nullable: false,
  })
  amount: number;

  @Column({ default: false, nullable: false })
  hidden: boolean;

  @ManyToOne(() => User, (user) => user.offers, { nullable: false })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers, { nullable: false })
  @JoinColumn()
  item: Wish;
}
