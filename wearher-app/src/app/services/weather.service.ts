import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private WEATHER_BASE_API_SERVER = "http://api.weatherbit.io/v2.0/forecast/daily";
  private API_KEY="39e1f212a5b84bd9bfd71bf328cf005f";
  
  constructor(private httpClient: HttpClient) {}

  public getForcast(country: string, city: string) {

    const forcastUrl = this.WEATHER_BASE_API_SERVER + '?key=' + this.API_KEY + '&country=' + country + '&city=' + city;
    return this.httpClient.get(forcastUrl);  
  }
}
