import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GioHang } from './entities/giohang.entity';
import { ThucDon } from 'src/Thuc_don/entities/thuc_don.entity';
import { GioHangService } from './giohang.service';
import { GioHangController } from './giohang.controller';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([GioHang, ThucDon, User]), UserModule],
  providers: [GioHangService],
  controllers: [GioHangController],
  exports: [GioHangService],
})
export class GioHangModule {}
