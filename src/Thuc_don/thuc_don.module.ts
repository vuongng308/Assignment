// src/Thuc_don/thuc_don.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThucDon } from './entities/thuc_don.entity';
import { ThucDonService } from './thuc_don.service';
import { ThucDonController } from './thuc_don.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ThucDon])],
  providers: [ThucDonService],
  controllers: [ThucDonController],
})
export class ThucDonModule {}
