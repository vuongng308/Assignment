import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateThanhToanDto {
  @IsNumber()
  ma_don_hang: number;

  @IsString()
  phuong_thuc_thanh_toan: string;

  @IsNumber()
  so_tien: number; // Thêm validation cho so_tien

  @IsBoolean()
  thanh_cong: boolean;

  @IsDateString()
  thoi_gian_thanh_toan: Date; // Đảm bảo thoi_gian_thanh_toan là kiểu Date hợp lệ
}
