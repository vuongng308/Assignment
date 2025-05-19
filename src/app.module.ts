import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThucDonModule } from './Thuc_don/thuc_don.module';
import { AuthModule } from './auth/auth.module';
import { DonHangModule } from './don_hang/donhang.module';
import { DanhGiaModule } from './danh_gia/danh_gia.module';
import { PhanThuongModule } from './phan_thuong/phan_thuong.module';
import { ThanhToanModule } from './thanh_toan/thanh_toan.module';
import { GioHangModule } from './gio_hang/giohang.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'hethongquanlybanhang',
      autoLoadEntities: true,
      synchronize: false,
    }),
    ThucDonModule,
    AuthModule,
    DonHangModule,
    DanhGiaModule,
    PhanThuongModule,
    ThanhToanModule,
    GioHangModule,
  ],
})
export class AppModule {}
