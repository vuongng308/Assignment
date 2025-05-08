import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('danh_gia')
export class DanhGia {
  @PrimaryGeneratedColumn({ name: 'ma_danh_gia' })
  id: number;

  @Column({ name: 'ma_nguoi_dung' })
  ma_khach_hang: number;

  @Column({ name: 'ma_mon_an' })
  ma_mon_an: number;

  @Column()
  diem_so: number;

  @Column('text', { nullable: true })
  binh_luan: string;

  @Column()
  thoi_gian_tao: Date;
}
export {};
