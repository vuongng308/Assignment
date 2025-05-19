import { GioHang } from './entities/giohang.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThucDon } from 'src/Thuc_don/entities/thuc_don.entity';
import { ThucDonService } from 'src/Thuc_don/thuc_don.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class GioHangService {
  constructor(
    @InjectRepository(GioHang)
    private readonly gioHangRepo: Repository<GioHang>,

    @InjectRepository(ThucDon)
    private readonly thucDonRepo: Repository<ThucDon>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

  ) {}
  
  async addToCart() {
    try {
      const giohang = this.gioHangRepo.create({
        text: '',
      });
  
      return await this.gioHangRepo.save(giohang);
    } catch (error) {
      console.error('Error while adding to cart:', error);
      throw new Error('Failed to add to cart');
    }
  }
  

  async remove() {
    await this.gioHangRepo.clear()
    return { delete: true }
  }

  findOne(id: number) {
    return this.gioHangRepo.findOneBy({ id });
  }

  findAll() {
    return this.gioHangRepo.find()
  }

  async update1(id: number, data: {userId: number;
                                  items: { ma_mon_an: number; soLuong: number; donGia: number }[]}) {
    let s = ''
        data.items.forEach(item => {
          s += item.ma_mon_an + " " + item.soLuong + " "
        })
    let temp: GioHang = {
          id: id,
          text: s,
    }
    await this.gioHangRepo.update(id, temp);
    return this.findOne(id);
  }

  async cartToProduct(id: number): Promise<{ product: ThucDon, quantity: number }[]> {
    const cart = await this.findOne(id)
    if (!cart) {
        throw new Error('Cart not found');
    }
    let cart1: { product: ThucDon, quantity: number }[] = [];
    if (cart.text !== '') {
        const data = cart.text.trim().split(' ')
    
    for(let i = 0; i < data.length; i += 2) {
      const product1 = await this.thucDonRepo.findOne({ where: { ma_mon_an: parseInt(data[i]) } })
      if (product1) {
        cart1.push ({
            product: product1,
            quantity: parseInt(data[i + 1])
        });
      }
    }
    
    }
    return cart1
  }

  async nameToId(username: string): Promise<number> {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
        throw new Error('User not found');
      }
    return user.ma_nguoi_dung;
  }
}
