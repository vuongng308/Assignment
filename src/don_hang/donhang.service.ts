import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonHang } from './entities/donhang.entity';
import { ChiTietDonHang } from './entities/chitietdonhang.entity';

@Injectable()
export class DonHangService {
  constructor(
    @InjectRepository(DonHang)
    private readonly donHangRepo: Repository<DonHang>,
  ) {}

  async taoDonHang(
    userId: number,
    items: { ma_mon_an: number; soLuong: number; donGia: number }[],
  ) {
    const tongTien = items.reduce(
      (total, item) => total + item.soLuong * item.donGia,
      0,
    );

    const chiTietDonHangList: ChiTietDonHang[] = items.map((item) => {
      const chiTiet = new ChiTietDonHang();
      chiTiet.ma_mon_an = item.ma_mon_an;
      chiTiet.soLuong = item.soLuong;
      chiTiet.donGia = item.donGia;
      return chiTiet;
    });

    const donHang = this.donHangRepo.create({
      userId, // giữ nguyên là userId
      tongTien,
      chiTietDonHang: chiTietDonHangList,
    });

    return this.donHangRepo.save(donHang);
  }

  async layDonHangMoiNhat(userId?: number) {
    const whereClause = userId ? { userId } : {};

    return this.donHangRepo.findOne({
      where: whereClause,
      order: { maDonHang: 'DESC' },
      relations: ['chiTietDonHang'],
    });
  }
}
