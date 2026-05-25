import { Injectable } from '@nestjs/common';
import { HelloResponseDto } from './dto/hello.dto';

@Injectable()
export class AppService {
  getHello(name: string = 'World'): HelloResponseDto {
    return { message: `Hello, ${name}!` };
  }
}
