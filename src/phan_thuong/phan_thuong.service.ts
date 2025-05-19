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

  async taoHoacCapNhatPhanThuong(body: {
    ma_khach_hang: number;
    diem_thuong: number;
  }): Promise<PhanThuong> {
    let phanThuong = await this.phanThuongRepo.findOne({
      where: { ma_khach_hang: body.ma_khach_hang },
    });

    if (phanThuong) {
      phanThuong.diem += body.diem_thuong;
      phanThuong.thoi_gian_tao = new Date();
    } else {
      phanThuong = this.phanThuongRepo.create({
        ma_khach_hang: body.ma_khach_hang,
        diem: body.diem_thuong,
        thoi_gian_tao: new Date(),
      });
    }

    return await this.phanThuongRepo.save(phanThuong);
  }

  async layLichSu(ma_khach_hang: number): Promise<PhanThuong[]> {
    return await this.phanThuongRepo.find({
      where: { ma_khach_hang },
      order: { thoi_gian_tao: 'DESC' },
    });
  }
}
