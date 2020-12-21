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
    code: 'nl',
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

  getGradient(){
    if(this.forcastData && this.forcastData.length){
      const avgTemp = this.getAvgTemp();
      return ''
    }else {
      return 'linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),linear-gradient(119.25deg,#102f7e -11.47%,#0c8dd6 3.95%,#1aa0ec 19.37%,#60c6ff 34.78%,#9bdbff 50.19%,#b4deda 65.61%,#ffd66b 81.02%,#ffc178 96.44%,#fe9255 111.85%);'
    }
  }
}
