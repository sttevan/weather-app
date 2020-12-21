import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private COUNTRIES_API_SERVER = "https://restcountries.eu/rest/v2/all";
  
  constructor(private httpClient: HttpClient) {}

  public getCountries() {
    return this.httpClient.get(this.COUNTRIES_API_SERVER);  
  }
}
