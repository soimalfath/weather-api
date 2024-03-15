import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async getWeather(lat: number, lon: number) {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const URL = process.env.OPEN_WEATHER_BASE_URL;

    try {
      const response = await axios.get(
        `${URL}/data/2.5/weather?lat=${lat}&lon=${lon}&lang=id&units=metric&appid=${apiKey}`,
      );
      const data = this.modifyData(response.data);
      const meta = {
        status: 'success',
        code: 200,
        message: 'Success get weather data',
      };
      return { data, meta };
    } catch (error) {
      const data = [];
      const meta = {
        status: 'error',
        code: error.response.data.code,
        message: error.response.data.message,
      };
      console.error(error.response.data);
      return { data, meta };
    }
  }
  private modifyData(dataWeather: any): any {
    const data = {
      icon: `https://veilannastore.com/wp-content/uploads/2024/03/${dataWeather.weather[0].icon}.svg`,
      city: dataWeather.name,
      weather: dataWeather.weather[0].description,
      temp: dataWeather.main.temp,
    };
    return data;
  }
}
