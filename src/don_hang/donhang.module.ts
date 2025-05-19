import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonHang } from './entities/donhang.entity';
import { ChiTietDonHang } from './entities/chitietdonhang.entity';
import { DonHangService } from './donhang.service';
import { DonHangController } from './donhang.controller';
import { GioHangModule } from 'src/gio_hang/giohang.module';

@Module({
  imports: [TypeOrmModule.forFeature([DonHang, ChiTietDonHang]), GioHangModule],
  providers: [DonHangService],
  controllers: [DonHangController],
})
export class DonHangModule {}
