import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //  Tự động xóa field không khai báo trong DTO
      forbidNonWhitelisted: true, // Nếu có field lạ thì ném lỗi 400 luôn
      transform: true, //  Tự động transform body thành DTO (quan trọng)
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
