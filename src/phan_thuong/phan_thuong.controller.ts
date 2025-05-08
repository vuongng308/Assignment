import { Controller, Post, Body } from '@nestjs/common';
import { PhanThuongService } from './phan_thuong.service';

@Controller('phanthuong')
export class PhanThuongController {
  constructor(private readonly phanThuongService: PhanThuongService) {}

  @Post()
  taoPhanThuong(@Body() body: any) {
    return this.phanThuongService.taoPhanThuong(body);
  }
}
