// payment.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DonHang } from '../../don_hang/entities/donhang.entity';

@Entity('thanh_toan')
export class ThanhToan {
  @PrimaryGeneratedColumn()
  ma_thanh_toan: number;

  @ManyToOne(() => DonHang, (donHang) => donHang.thanhToans, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ma_don_hang' })
  donHang: DonHang;

  @Column({ type: 'nvarchar', length: 50 })
  phuong_thuc_thanh_toan: string;

  @Column({ type: 'datetime' })
  thoi_gian_thanh_toan: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  so_tien: number;

  @Column({ type: 'bit' })
  thanh_cong: boolean;
}
export {};
