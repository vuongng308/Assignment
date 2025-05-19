import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
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

  // Đăng ký tài khoản mới
  async register(registerDto: RegisterDto): Promise<string> {
    const { username, password, email } = registerDto;

    const user = this.userRepository.create({
      username,
      password,
      email,
    });

    try {
      await this.userRepository.save(user);
      return 'Đăng ký thành công!';
    } catch (err) {
      if (err.code === '23505' || err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Tên đăng nhập hoặc email đã tồn tại!');
      }
      throw new InternalServerErrorException('Lỗi máy chủ!');
    }
  }

  // Đăng nhập
  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const { password: _, ...result } = user;

    return {
      userId: result.ma_nguoi_dung,
      username: result.username,
      email: result.email,
      fullName: result.ho_ten,
      avatar: '/images/user.svg',
    };
  }

  // Cập nhật thông tin người dùng
  async updateUserInfo(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<string> {
    try {
      const user = await this.userRepository.findOne({
        where: { ma_nguoi_dung: userId },
      });

      if (!user) {
        throw new InternalServerErrorException('Người dùng không tồn tại');
      }

      // Gộp firstName và lastName nếu có
      const { firstName, lastName, ...rest } = updateUserDto;

      const ho_ten = [firstName, lastName]
        .filter(Boolean) // Loại bỏ undefined/null
        .join(' ')
        .trim(); // Gộp lại thành chuỗi "Vu Hoang"

      if (ho_ten) {
        user.ho_ten = ho_ten;
      }

      // Gán các trường còn lại
      Object.assign(user, rest);

      await this.userRepository.save(user);
      return 'Cập nhật thông tin thành công';
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi cập nhật thông tin');
    }
  }
}