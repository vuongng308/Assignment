import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gio_hang')
export class GioHang {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;
}
export {};
