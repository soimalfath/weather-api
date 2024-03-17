import { Module } from '@nestjs/common';
import { ContentController } from './content/content.controller';
import { ContentService } from './content/content.service';

@Module({
  controllers: [ContentController],
  providers: [ContentService]
})
export class ContentModule {}
