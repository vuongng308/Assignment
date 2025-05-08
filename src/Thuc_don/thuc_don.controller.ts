import { Controller, Get, Post, Body } from '@nestjs/common';
import { ThucDonService } from './thuc_don.service';
import { ThucDon } from './entities/thuc_don.entity';

@Controller('thuc-don')
export class ThucDonController {
  constructor(private readonly thucDonService: ThucDonService) {}

  @Get()
  async getAll(): Promise<any[]> {
    const data = await this.thucDonService.findAll();

    return data.map((item) => ({
      ...item,
      image: item.url_hinh_anh.startsWith('/images/')
        ? item.url_hinh_anh
        : `/images/${item.url_hinh_anh}`,
    }));
  }

  @Post()
  create(@Body() data: Partial<ThucDon>): Promise<ThucDon> {
    return this.thucDonService.create(data);
  }

  @Post('import')
  importMany(@Body() data: Partial<ThucDon>[]): Promise<ThucDon[]> {
    return this.thucDonService.bulkCreate(data);
  }
}
