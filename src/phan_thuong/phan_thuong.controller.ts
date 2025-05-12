import { Controller, Post, Body } from '@nestjs/common';
import { PhanThuongService } from './phan_thuong.service';

@Controller('phanthuong')
export class PhanThuongController {
  constructor(private readonly phanThuongService: PhanThuongService) {}

  @Post()
  async taoHoacCapNhat(@Body() body: { ma_khach_hang: number; diem_thuong: number }) {
    return this.phanThuongService.taoHoacCapNhatPhanThuong(body);
  }
}
