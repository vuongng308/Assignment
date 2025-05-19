import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ThanhToanService } from './thanh_toan.service';
import { CreateThanhToanDto } from './dto/create-payment.dto';
import { ThanhToan } from './entities/thanh_toan.entity';

@Controller('thanh-toan')
export class ThanhToanController {
  constructor(private readonly thanhToanService: ThanhToanService) {}

  // Tạo mới một bản ghi thanh toán
  @Post()
  async create(@Body() createThanhToanDto: CreateThanhToanDto): Promise<ThanhToan> {
    return this.thanhToanService.createThanhToan(createThanhToanDto); // Đổi từ create() sang createThanhToan()
  }

  // Cập nhật trạng thái thanh toán
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateThanhToanDto: Partial<ThanhToan>,
  ): Promise<ThanhToan> {
    return this.thanhToanService.updateThanhToan(id, updateThanhToanDto);
  }

  // Lấy danh sách thanh toán theo mã đơn hàng
  @Get('don-hang/:maDonHang')
  async findByDonHang(@Param('maDonHang') maDonHang: number): Promise<ThanhToan[]> {
    return this.thanhToanService.findByDonHangId(maDonHang);
  }
}
