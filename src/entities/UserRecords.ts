import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class UserRecords {
  @PrimaryGeneratedColumn()
  id!: number; // Add '!' to indicate that it will be initialized later

  @ManyToOne(() => User, (user) => user.records)
  user!: User;

  @Column({ length: 255 })
  title!: string;

  @Column()
  description!: string;

  @Column('varchar', { array: true })
  tags!: string[];

  @Column('varchar', { array: true, nullable: true })
  media!: string[];
}
