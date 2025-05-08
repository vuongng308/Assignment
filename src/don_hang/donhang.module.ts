import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonHang } from './entities/donhang.entity';
import { ChiTietDonHang } from './entities/chitietdonhang.entity';
import { DonHangService } from './donhang.service';
import { DonHangController } from './donhang.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DonHang, ChiTietDonHang])],
  providers: [DonHangService],
  controllers: [DonHangController],
})
export class DonHangModule {}
