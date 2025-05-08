import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('nguoi_dung')
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn({ name: 'ma_nguoi_dung' })
  ma_nguoi_dung: number;

  @Column({ name: 'ten_dang_nhap' })
  username: string;

  @Column()
  email: string;

  @Column({ name: 'mat_khau_hash' })
  password: string;

  @Column({ name: 'ho_ten', nullable: true })
  ho_ten: string;

  // Getter cho trường 'ho_ten', trả về chuỗi trống nếu giá trị là null
  get ho_ten_default(): string {
    return this.ho_ten || '';  // Trả về chuỗi trống nếu ho_ten là null
  }
}
