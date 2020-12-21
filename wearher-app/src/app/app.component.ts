import { Component, OnInit } from '@angular/core';
import { CountryService } from './services/country.service';
import { WeatherService } from './services/weather.service';

interface iCountry {
  code: string;
  flag: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'wearher-app';
  countries: Array<iCountry> = [];
  city: string= '';
  //preselected country is Netherlands
  selectedCountry: iCountry = {
    code: 'nl',
    flag: 'https://restcountries.eu/data/nld.svg'
  };

  forcastData: Array<any> =[];

  constructor(private countryService: CountryService, 
              private weatherService: WeatherService
              ) { }


  ngOnInit() {
    this.getCountries();
  }

  //Call extrernal api for countries and reduce the objects size 
  getCountries():void{
    this.countryService.getCountries().subscribe((data: any)=>{
      
      this.countries = data.map((country: any)=>{
        return{
          code: country?.alpha2Code,
          flag: country?.flag
        }


      });
    })
  }


  //On Enter pressed trigger the forcast by triggering external api and 
  // stripping unnecesary data
  getForcast(event:any) {
    event.preventDefault();
    event.stopPropagation();
    this.city = event.target.value;
    this.weatherService.getForcast(this.selectedCountry.code, this.city).subscribe((result: any)=>{
      
      if(result){
        this.forcastData = result.data.map((item: any) =>{
          return {
            date: item.datetime,
            temp: item.temp
          }
        });
      }

    })

  }

  // returns a 10 day average temperature
  getAvgTemp(){
    let avgTemp = this.forcastData?.reduce((total, next, index) => {
      if(index < 10){
        return total + next.temp
      }else {
        return total
      }
    }, 0)/10
    return avgTemp
  }

  getIndex(){
    return  Math.floor((this.getAvgTemp() + 48) /9);
  }
}
