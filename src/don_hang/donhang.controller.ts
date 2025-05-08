import { Body, Controller, Post } from '@nestjs/common';
import { DonHangService } from './donhang.service';

@Controller('orders')
export class DonHangController {
  constructor(private readonly donHangService: DonHangService) {}

  @Post('checkout')
  async checkout(
    @Body()
    body: {
      userId: number;
      items: { ma_mon_an: number; soLuong: number; donGia: number }[];
    },
  ) {
    const { userId, items } = body;
    const donHang = await this.donHangService.taoDonHang(userId, items);

    return {
      donHang: {
        maDonHang: donHang.maDonHang,
        tongTien: donHang.tongTien, // có thể thêm nếu muốn
      },
    };
  }
}
export {};
