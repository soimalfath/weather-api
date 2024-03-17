import { Controller, Get, HttpCode } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private contenservice: ContentService) {}
  @HttpCode(200)
  @Get()
  getContent() {
    return this.contenservice.getPost();
  }
}
