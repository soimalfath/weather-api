import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [ConfigModule.forRoot(), WeatherModule, ContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
