import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonHang } from './entities/donhang.entity';
import { ChiTietDonHang } from './entities/chitietdonhang.entity';
import { GioHangService } from 'src/gio_hang/giohang.service';

@Injectable()
export class DonHangService {
  constructor(
    @InjectRepository(DonHang)
    private readonly donHangRepo: Repository<DonHang>,

    private readonly gioHangService: GioHangService,
  ) {}

  async taoDonHang(userId: number) {
    const temp = await this.gioHangService.cartToProduct(userId);

    let tongTien = 0;
    const items = temp.map(item => {
      tongTien += item.product.gia * item.quantity;
      return {
        ma_mon_an: item.product.ma_mon_an,
        soLuong: item.quantity,
        donGia: item.product.gia,
      };
    });

    const chiTietDonHangList: ChiTietDonHang[] = items.map((item) => {
      const chiTiet = new ChiTietDonHang();
      chiTiet.ma_mon_an = item.ma_mon_an;
      chiTiet.soLuong = item.soLuong;
      chiTiet.donGia = item.donGia;
      return chiTiet;
    });

    const donHang = this.donHangRepo.create({
      userId,
      tongTien,
      trangThai: 'Đang xử lý',
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

  async layTatCaDonHang() {
    return this.donHangRepo.find({
      order: { maDonHang: 'DESC' },
      relations: ['chiTietDonHang'],
    });
  }

  // ✅ Lấy danh sách đơn hàng theo userId
  async layDonHangTheoUser(userId: number) {
    return this.donHangRepo.find({
      where: { userId },
      order: { maDonHang: 'DESC' },
      relations: ['chiTietDonHang'],
    });
  }

  async capNhatTrangThaiDonHang(id: string, trangThai: string) {
    const donHang = await this.donHangRepo.findOneBy({ maDonHang: +id });
    if (!donHang) return null;

    donHang.trangThai = trangThai;
    return this.donHangRepo.save(donHang);
  }
}
