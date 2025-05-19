import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { DonHang } from './donhang.entity';

@Entity('chi_tiet_don_hang')
export class ChiTietDonHang {
  @PrimaryGeneratedColumn({ name: 'ma_chi_tiet' })
  id: number;

  @ManyToOne(() => DonHang, (donHang) => donHang.chiTietDonHang, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ma_don_hang' }) // Đảm bảo tạo đúng foreign key
  donHang: DonHang;

  @Column()
  ma_mon_an: number;

  @Column({ name: 'so_luong' })
  soLuong: number;

  @Column({ name: 'don_gia' })
  donGia: number;

  @Column({ nullable: true })
  ghi_chu: string;
}
