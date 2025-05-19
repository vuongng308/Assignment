import { Body, Controller, Get, Post, Put, Param, Query } from '@nestjs/common';
import { DonHangService } from './donhang.service';

@Controller('orders')
export class DonHangController {
  constructor(private readonly donHangService: DonHangService) {}

  @Post('checkout')
  async checkout(
    @Body() body: { userId: number },
  ) {
    const donHang = await this.donHangService.taoDonHang(body.userId);
    return {
      maDonHang: donHang.maDonHang,
      tongTien: donHang.tongTien,
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

  // ✅ Lấy tất cả đơn hàng của một user
  @Get('user/:userId')
  async getOrdersByUser(@Param('userId') userId: number) {
    const orders = await this.donHangService.layDonHangTheoUser(+userId);
    if (!orders || orders.length === 0) {
      return {
        message: 'Không tìm thấy đơn hàng nào cho người dùng này!',
        statusCode: 404,
      };
    }
    return {
      donHangs: orders,
    };
  }

  @Get()
  async getAllOrders() {
    const orders = await this.donHangService.layTatCaDonHang();
    return { donHangs: orders };
  }

  @Put(':id')
  async capNhatTrangThai(
    @Param('id') id: string,
    @Body() body: { trangThai: string },
  ) {
    const updated = await this.donHangService.capNhatTrangThaiDonHang(id, body.trangThai);
    if (!updated) {
      return {
        statusCode: 404,
        message: 'Không tìm thấy đơn hàng cần cập nhật',
      };
    }
    return {
      message: 'Cập nhật trạng thái đơn hàng thành công',
    };
  }
}
