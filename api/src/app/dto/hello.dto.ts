import { ApiProperty } from '@nestjs/swagger';

export class HelloResponseDto {
  @ApiProperty({
    description: 'Greeting message',
    example: 'Hello, Victor!',
  })
  message: string;
}
