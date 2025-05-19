import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('thuc_don')
export class ThucDon {
  @PrimaryGeneratedColumn({ name: 'ma_mon_an' })
  ma_mon_an: number;

  @Column({ type: 'nvarchar', length: 50 })
  danh_muc: string;

  @Column({ type: 'nvarchar', length: 100 })
  ten_mon_an: string;

  @Column({ type: 'nvarchar', nullable: true })
  mo_ta: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  gia: number;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  url_hinh_anh: string;
}
