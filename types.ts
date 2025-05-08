export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  nutrition?: string;
}

export interface Reward {
  id: string;
  points: number;
  date: string;
  source: string;
}
