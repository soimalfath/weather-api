import { Module } from '@nestjs/common';
import { WeatherService } from './weather/weather.service';
import { WeatherController } from './weather/weather.controller';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
