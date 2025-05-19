import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { GioHang } from './entities/giohang.entity';
import { GioHangService } from './giohang.service';

@Controller('cart')
export class GioHangController {
  constructor(private readonly gioHangService: GioHangService) {}

  @Post('a')
  async create() {
    return await this.gioHangService.addToCart();
  }

  @Get()
  async get() {
    return this.gioHangService.findAll()
  }

  @Put(':id')
  async put(@Param('id') id: number, @Body() data:   {userId: number;
                                                      items: { ma_mon_an: number; soLuong: number; donGia: number }[]}) {
    return this.gioHangService.update1(+id, data)
  }

  @Delete()
  async xoa() {
    return this.gioHangService.remove()
  }

  @Get('username/:username')
  async getid(@Param('username') username: string) {
    return this.gioHangService.nameToId(username)
  }

  @Get('id/:id')
  async laysanpham(@Param('id') id: number) {
    return this.gioHangService.cartToProduct(id)
  }

  @Get('fid/:id')
  async getbyID(@Param('id') id: number) {
    return this.gioHangService.findOne(id)
  }
}