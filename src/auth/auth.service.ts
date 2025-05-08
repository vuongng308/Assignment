import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<string> {
    const { username, password, email } = registerDto;

    // Tạo đối tượng user mới
    const user = this.userRepository.create({
      username,
      password,
      email,
    });

    try {
      // Lưu người dùng vào CSDL
      await this.userRepository.save(user);
      return 'Đăng ký thành công!';
    } catch (err) {
      if (err.code === '23505' || err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Tên đăng nhập hoặc email đã tồn tại!');
      }
      throw new InternalServerErrorException('Lỗi máy chủ!');
    }
  }

  async login(email: string, password: string): Promise<any> {
    // Tìm người dùng theo email
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    // Xóa mật khẩu khỏi đối tượng trả về
    const { password: _, ...result } = user;
    return result;
  }

  // async updateUserInfo(userId: number, updateUserDto: UpdateUserDto): Promise<string> {
  //   try {
  //     // Tìm người dùng theo ma_nguoi_dung
  //     const user = await this.userRepository.findOne({ where: { ma_nguoi_dung: userId } });

  //     if (!user) {
  //       throw new InternalServerErrorException('Người dùng không tồn tại');
  //     }

  //     // Cập nhật thông tin người dùng
  //     Object.assign(user, updateUserDto);
  //     await this.userRepository.save(user);
  //     return 'Cập nhật thông tin thành công';
  //   } catch (error) {
  //     throw new InternalServerErrorException('Lỗi khi cập nhật thông tin');
  //   }
  // }
}
