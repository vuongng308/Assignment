import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Đăng ký tài khoản
  @Post('register')
  async register(@Body() body: RegisterDto) {
    const { username, email, password } = body;

    if (!username || !email || !password) {
      throw new BadRequestException('Thiếu thông tin bắt buộc');
    }

    return this.authService.register(body);
  }

  // Đăng nhập
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestException('Thiếu email hoặc mật khẩu');
    }

    return this.authService.login(email, password);
  }

  // Cập nhật thông tin người dùng
  @Put('update/:userId')
  async updateUserInfo(
    @Param('userId', ParseIntPipe) userId: number, // Đảm bảo userId luôn là số
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUserInfo(userId, updateUserDto);
  }
}