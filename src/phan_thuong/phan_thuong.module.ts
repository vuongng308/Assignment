import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhanThuong } from './entities/phan_thuong.entity';
import { PhanThuongService } from './phan_thuong.service';
import { PhanThuongController } from './phan_thuong.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PhanThuong])],
  providers: [PhanThuongService],
  controllers: [PhanThuongController],
})
export class PhanThuongModule {}
