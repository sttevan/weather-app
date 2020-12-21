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
  selectedCountry: iCountry = {
    code: 'NL',
    flag: 'https://restcountries.eu/data/nld.svg'
  };

  forcastData: Array<any> =[];

  constructor(private countryService: CountryService, 
              private weatherService: WeatherService) { }


  ngOnInit() {
    this.getCountries();
  }


  getCountries():void{
    this.countryService.getCountries().subscribe((data: any)=>{
      
      this.countries = data.map((country: any)=>{
        return{
          code: country?.alpha2Code,
          flag: country?.flag
        }


      });
      console.log(this.countries);
    })
  }

  getForcast(event:any) {
    console.log('get forcast')
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
      console.log(this.forcastData)

    })

  }
  getAvgTemp(){
    let avgTemp = this.forcastData.reduce((total, next, index) => {
      if(index < 10){
        return total + next.temp
      }else {
        return total
      }
    }, 0)/10
    console.log(avgTemp, )
    return avgTemp
  }
}
