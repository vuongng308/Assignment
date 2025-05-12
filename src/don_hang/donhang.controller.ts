import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
        tongTien: donHang.tongTien,
      },
    };
  }

  @Get('last')
  async getLastOrder(@Query('userId') userId?: number) {
    const order = await this.donHangService.layDonHangMoiNhat(userId);

    if (!order) {
      return {
        message: 'Không tìm thấy đơn hàng nào cho người dùng này!',
        statusCode: 404,
      };
    }
    return {
      donHang: order,
    };
  }
}
