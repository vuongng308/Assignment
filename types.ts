export interface Product {
  ma_mon_an: number;
  danh_muc: string;
  ten_mon_an: string;
  mo_ta: string;
  gia: number;
  url_hinh_anh: string;
}

export interface Reward {
  id: string;
  points: number;
  date: string;
  source: string;
}
export interface Donhang {
  userId: number;
  items: { ma_mon_an: number; soLuong: number; donGia: number }[];
}
