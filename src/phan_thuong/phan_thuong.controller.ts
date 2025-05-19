import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PhanThuongService } from './phan_thuong.service';
import { PhanThuong } from './entities/phan_thuong.entity';

@Controller('phanthuong')
export class PhanThuongController {
  constructor(private readonly phanThuongService: PhanThuongService) {}

  @Post()
  async taoHoacCapNhat(@Body() body: { ma_khach_hang: number; diem_thuong: number }) {
    return this.phanThuongService.taoHoacCapNhatPhanThuong(body);
  }

  @Get(':ma_khach_hang')
  async layLichSuDiem(@Param('ma_khach_hang') ma_khach_hang: number): Promise<{ lichSu: PhanThuong[] }> {
    const lichSu = await this.phanThuongService.layLichSu(ma_khach_hang);
    return { lichSu };
  }
}
