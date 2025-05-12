import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateDanhGiaDto {
  @IsInt()
  @IsNotEmpty()
  ma_nguoi_dung: number;

  @IsInt()
  @IsNotEmpty()
  ma_don_hang: number;

  @IsInt()
  @IsNotEmpty()
  diem_so: number;

  @IsString()
  binh_luan: string;
}
