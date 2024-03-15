import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherservice: WeatherService) {}
  @Get()
  getWheater(@Query('lat') lat: number, @Query('lon') lon: number) {
    return this.weatherservice.getWeather(lat, lon);
  }
}
