import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DanhGia } from './entities/danh_gia.entity';
import { CreateDanhGiaDto } from './dto/CreateDanhGiaDto';

@Injectable()
export class DanhGiaService {
  constructor(
    @InjectRepository(DanhGia)
    private readonly danhGiaRepo: Repository<DanhGia>,
  ) {}

  async taoDanhGia(dto: CreateDanhGiaDto) {
    const danhGia = this.danhGiaRepo.create(dto);
    return this.danhGiaRepo.save(danhGia);
  }
}
