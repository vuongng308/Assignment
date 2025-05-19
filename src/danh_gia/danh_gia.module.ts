import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanhGia } from './entities/danh_gia.entity';
import { DanhGiaService } from './danh_gia.service';
import { DanhGiaController } from './danh_gia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DanhGia])],
  providers: [DanhGiaService],
  controllers: [DanhGiaController],
})
export class DanhGiaModule {}
