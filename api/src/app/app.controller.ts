import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { HelloResponseDto } from './dto/hello.dto';

@ApiTags('Hello')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Hello World',
    description:
      'Returns a greeting message. Pass a `name` query param to personalize it.',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    example: 'Victor',
    description: 'Name to greet (defaults to "World")',
  })
  @ApiOkResponse({
    type: HelloResponseDto,
    description: 'Greeting message returned successfully',
  })
  getHello(@Query('name') name?: string): HelloResponseDto {
    return this.appService.getHello(name);
  }
}
