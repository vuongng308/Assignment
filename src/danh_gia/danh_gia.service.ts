import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DanhGia } from './entities/danh_gia.entity';

@Injectable()
export class DanhGiaService {
  constructor(
    @InjectRepository(DanhGia)
    private danhGiaRepo: Repository<DanhGia>,
  ) {}

  async taoDanhGia(dto: {
    ma_khach_hang: number;
    ma_mon_an: number;
    diem_so: number;
    binh_luan?: string;
  }) {
    const danhGia = this.danhGiaRepo.create({
      ...dto,
      thoi_gian_tao: new Date(),
    });
    return this.danhGiaRepo.save(danhGia);
  }
}
