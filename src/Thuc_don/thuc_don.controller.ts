import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ThucDonService } from './thuc_don.service';
import { ThucDon } from './entities/thuc_don.entity';

@Controller('thuc-don')
export class ThucDonController {
  constructor(private readonly thucDonService: ThucDonService) {}

  @Get()
  async getAll(): Promise<any[]> {
    const data = await this.thucDonService.findAll();
    return data
  }

  @Post('add')
  create(@Body() data: {
    danhmuc: string,
    ten: string,
    mota: string,
    gia: number,
  }): Promise<ThucDon> {
    return this.thucDonService.create(data);
  }

  @Post('import')
  importMany(@Body() data: Partial<ThucDon>[]): Promise<ThucDon[]> {
    return this.thucDonService.bulkCreate(data);
  }

  @Put(':id')
  async put(@Param('id') id: number, @Body() data: {
                                                    danhmuc: string,
                                                    ten: string,
                                                    mota: string,
                                                    gia: number,
                                                  }) {
    return this.thucDonService.capnhat(+id, data)
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.thucDonService.xoa(id);
  }

}
