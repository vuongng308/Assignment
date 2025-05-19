import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('nguoi_dung') // Tên bảng trong cơ sở dữ liệu
@Unique(['username', 'email']) // Đảm bảo rằng username và email là duy nhất trong bảng
export class User {
  @PrimaryGeneratedColumn({ name: 'ma_nguoi_dung' }) // Cột khóa chính, tự động tăng
  ma_nguoi_dung: number;

  @Column({ name: 'ten_dang_nhap', type: 'varchar', length: 255 }) // Tên đăng nhập
  username: string;

  @Column({ type: 'varchar', length: 255 }) // Email người dùng
  email: string;

  @Column({ name: 'mat_khau_hash', type: 'varchar', length: 255 }) // Mật khẩu đã được mã hóa
  password: string;

  @Column({ name: 'ho_ten', nullable: true, type: 'varchar', length: 255 }) // Tên đầy đủ của người dùng
  ho_ten: string;

  // Getter để trả về tên đầy đủ nếu có, hoặc chuỗi trống nếu không có
  get ho_ten_default(): string {
    return this.ho_ten || ''; // Trả về chuỗi trống nếu ho_ten là null
  }

  // Getter cho tên hiển thị của người dùng
  get displayName(): string {
    return this.ho_ten ? this.ho_ten : this.username; // Nếu có ho_ten thì dùng, nếu không dùng username
  }
}