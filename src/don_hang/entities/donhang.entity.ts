import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChiTietDonHang } from './chitietdonhang.entity';
import { ThanhToan } from '../../thanh_toan/entities/thanh_toan.entity';
import { DanhGia } from '../../danh_gia/entities/danh_gia.entity';

@Entity('don_hang')
export class DonHang {
  @PrimaryGeneratedColumn({ name: 'ma_don_hang' })
  maDonHang: number;

  @Column({ name: 'ma_nguoi_dung' })
  userId: number;

  @Column({ name: 'tong_tien' })
  tongTien: number;

  @Column({ default: 'pending', name: 'trang_thai' })
  trangThai: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'thoi_gian_dat',
  })
  createdAt: Date;

  @OneToMany(() => ChiTietDonHang, (chiTiet) => chiTiet.donHang, {
    cascade: true,
  })
  chiTietDonHang: ChiTietDonHang[];

  @OneToMany(() => ThanhToan, (tt) => tt.donHang)
  thanhToans: ThanhToan[];

  @OneToMany(() => DanhGia, (danhGia) => danhGia.donHang)
  danhGias: DanhGia[];
}
