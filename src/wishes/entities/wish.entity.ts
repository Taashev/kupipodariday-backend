import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/users/entities/users.entity';

@Entity({ name: 'wishes' })
@Check('"price" >= 1')
@Check('"raised" >= 0')
@Check('"copied" >= 0')
export class Wish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;

  @Column({ length: 250, nullable: false })
  name: string;

  @Column({ nullable: false })
  link: string;

  @Column({ nullable: false })
  image: string;

  @Column({ type: 'decimal', precision: 20, scale: 2, nullable: false })
  price: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    default: 0,
    nullable: false,
  })
  raised: number;

  @Column({ length: 1024, nullable: false })
  description: string;

  @Column({ default: 0, nullable: false })
  copied: number;

  @ManyToOne(() => User, (user) => user.wishes, { nullable: false })
  owner: User;
}
