import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('phan_thuong')
export class PhanThuong {
  @PrimaryGeneratedColumn({ name: 'ma_phan_thuong' })
  id: number;

  @Column({ name: 'ma_nguoi_dung' })
  ma_khach_hang: number;

  @Column({ name: 'diem', type: 'int', default: 1 })
  diem: number;

  @Column({ name: 'thoi_gian_cap_nhat', type: 'timestamp' })
  thoi_gian_tao: Date;
}
