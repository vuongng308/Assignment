import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhanThuong } from './entities/phan_thuong.entity';

@Injectable()
export class PhanThuongService {
  constructor(
    @InjectRepository(PhanThuong)
    private readonly phanThuongRepo: Repository<PhanThuong>,
  ) {}

  async taoPhanThuong(data: Partial<PhanThuong>): Promise<PhanThuong> {
    const phanThuong = this.phanThuongRepo.create({
      ...data,
      thoi_gian_tao: new Date(),
    });
    return await this.phanThuongRepo.save(phanThuong);
  }
  async insertPhanThuong(body: {
    ma_khach_hang: number;
    diem_thuong: number;
  }): Promise<void> {
    await this.phanThuongRepo.insert({
      ma_khach_hang: body.ma_khach_hang,
      diem: body.diem_thuong,
      thoi_gian_tao: new Date(),
    });
  }
}
