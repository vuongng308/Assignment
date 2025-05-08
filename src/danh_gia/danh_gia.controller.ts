import { Controller, Post, Body } from '@nestjs/common';
import { DanhGiaService } from './danh_gia.service';

@Controller('danhgia')
export class DanhGiaController {
  constructor(private readonly danhGiaService: DanhGiaService) {}

  @Post()
  taoDanhGia(@Body() body: any) {
    return this.danhGiaService.taoDanhGia(body);
  }
}
