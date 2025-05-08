import { Injectable } from '@nestjs/common';
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

  create(data: Partial<ThucDon>): Promise<ThucDon> {
    return this.thucDonRepo.save(data);
  }

  bulkCreate(data: Partial<ThucDon>[]): Promise<ThucDon[]> {
    return this.thucDonRepo.save(data);
  }
}
