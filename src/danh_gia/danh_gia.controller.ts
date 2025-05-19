import { Controller, Post, Body } from '@nestjs/common';
import { DanhGiaService } from './danh_gia.service';
import { CreateDanhGiaDto } from './dto/CreateDanhGiaDto';

@Controller('danhgia')
export class DanhGiaController {
  constructor(private readonly danhGiaService: DanhGiaService) {}

  @Post()
  taoDanhGia(@Body() createDanhGiaDto: CreateDanhGiaDto) {
    return this.danhGiaService.taoDanhGia(createDanhGiaDto);
  }
}
