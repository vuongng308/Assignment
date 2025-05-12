import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { DonHang } from '../../don_hang/entities/donhang.entity';

@Entity('danh_gia')
export class DanhGia {
  @PrimaryGeneratedColumn({ name: 'ma_danh_gia' })
  id: number;

  @Column({ name: 'ma_nguoi_dung' })
  ma_nguoi_dung: number;
  @Column({ name: 'ma_don_hang' })
  ma_don_hang: number;

  @Column()
  diem_so: number;

  @Column('text', { nullable: true })
  binh_luan: string;

  @CreateDateColumn({ name: 'thoi_gian_tao' })
  thoi_gian_tao: Date;

  @ManyToOne(() => DonHang, (donHang) => donHang.danhGias)
  @JoinColumn({ name: 'ma_don_hang' }) // khoá ngoại
  donHang: DonHang;
}
