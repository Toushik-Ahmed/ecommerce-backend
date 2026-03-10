import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 100,
  })
  email!: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  password!: string;
}
