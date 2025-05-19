import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThucDon } from './entities/thuc_don.entity';

@Injectable()
export class ThucDonService {
  constructor(
    @InjectRepository(ThucDon)
    private readonly thucDonRepo: Repository<ThucDon>,
  ) {}

  findAll(): Promise<ThucDon[]> {
    return this.thucDonRepo.find();
  }

  async create(data: {
    danhmuc: string,
    ten: string,
    mota: string,
    gia: number,
  }) {
    try {
      const thucdon = this.thucDonRepo.create({
        danh_muc: data.danhmuc,
        ten_mon_an: data.ten,
        gia: data.gia,
        mo_ta: data.mota,
        url_hinh_anh: '/images/cupcake1.jpg',
      });
  
      return await this.thucDonRepo.save(thucdon);
    } catch (error) {
      console.error('Error while create thucdon:', error);
      throw new Error('Failed to create thucdon');
    }
  }

  bulkCreate(data: Partial<ThucDon>[]): Promise<ThucDon[]> {
    return this.thucDonRepo.save(data);
  }

  findOne(ma_mon_an: number) {
    return this.thucDonRepo.findOneBy({ ma_mon_an });
  }

  async capnhat(id: number, data: {
                                    danhmuc: string,
                                    ten: string,
                                    mota: string,
                                    gia: number,
                                  }) {
      let temp: ThucDon = {
        ma_mon_an: id,
        danh_muc: data.danhmuc,
        ten_mon_an: data.ten,
        gia: data.gia,
        mo_ta: data.mota,
        url_hinh_anh: '/images/cupcake1.jpg',
      }
      await this.thucDonRepo.update(id, temp);
      return this.findOne(id);
  }

  async xoa(id: number) {
    const monAn = await this.thucDonRepo.findOneBy({ ma_mon_an: id });
    if (!monAn) throw new NotFoundException('Món ăn không tồn tại');

    return this.thucDonRepo.remove(monAn); // hoặc this.repo.delete(id);
  }

}
