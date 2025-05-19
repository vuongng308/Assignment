import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThanhToan } from './entities/thanh_toan.entity';
import { DonHang } from '../don_hang/entities/donhang.entity';
import { ThanhToanController } from './thanh_toan.controller';
import { ThanhToanService } from './thanh_toan.service';

@Module({
  imports: [TypeOrmModule.forFeature([ThanhToan, DonHang])],
  controllers: [ThanhToanController],
  providers: [ThanhToanService],
})
export class ThanhToanModule {}
export {};
