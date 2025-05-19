import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThanhToan } from './entities/thanh_toan.entity';
import { DonHang } from '../don_hang/entities/donhang.entity';
import { CreateThanhToanDto } from './dto/create-payment.dto';

@Injectable()
export class ThanhToanService {
  constructor(
    @InjectRepository(ThanhToan)
    private readonly thanhToanRepository: Repository<ThanhToan>,

    @InjectRepository(DonHang)
    private readonly donHangRepository: Repository<DonHang>,
  ) {}

  async createThanhToan(dto: CreateThanhToanDto): Promise<ThanhToan> {
    console.log('DTO received in backend:', dto);

    const donHang = await this.donHangRepository.findOne({
      where: { maDonHang: Number(dto.ma_don_hang) }, // ép kiểu đề phòng
    });

    if (!donHang) {
      console.error(`DonHang with maDonHang=${dto.ma_don_hang} not found`);
      throw new Error('DonHang not found');
    }

    const thanhToan = this.thanhToanRepository.create({
      donHang,
      phuong_thuc_thanh_toan: dto.phuong_thuc_thanh_toan,
      thoi_gian_thanh_toan: new Date(),
      so_tien: donHang.tongTien,
      thanh_cong: true,
    });

    return this.thanhToanRepository.save(thanhToan);
  }

  async updateThanhToan(
    id: number,
    thanhToanData: Partial<ThanhToan>,
  ): Promise<ThanhToan> {
    const thanhToan = await this.thanhToanRepository.findOne({
      where: { ma_thanh_toan: id },
    });
    if (!thanhToan) {
      throw new Error('ThanhToan not found');
    }

    Object.assign(thanhToan, thanhToanData);

    return this.thanhToanRepository.save(thanhToan);
  }

  async findByDonHangId(maDonHang: number): Promise<ThanhToan[]> {
    return this.thanhToanRepository.find({
      where: { donHang: { maDonHang } },
      relations: ['donHang'],
    });
  }
}
