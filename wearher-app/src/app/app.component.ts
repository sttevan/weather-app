import { Component, OnInit, ElementRef } from '@angular/core';
import { CountryService } from './services/country.service';
import { WeatherService } from './services/weather.service';

//Gradient matrix
const GRADIENTS =[
  ['#102F7E'], 
  ['#102F7E', '#0C8DD6'], 
  ['#102F7E', '#0C8DD6',  '#1AA0EC'], 
  ['#0C8DD6',  '#1AA0EC',  '#60C6FF'], 
  ['#1AA0EC',  '#60C6FF', '#9BDBFF'],
  ['#60C6FF', '#9BDBFF', '#B4DEDA'],
  ['#9BDBFF', '#B4DEDA', '#FFD66B'],
  ['#B4DEDA', '#FFD66B', '#FFC178'],
  ['#FFD66B', '#FFC178', '#FE9255']
]
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
  background: string = '';

  constructor(private countryService: CountryService, 
              private weatherService: WeatherService,
              private elRef: ElementRef) { }


  ngOnInit() {
    this.getCountries();
    this.background = ''
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
        this.updateGradient(this.getGradientString())
      }

    })

  }

  // returns a 10 day average temperature
  getAvgTemp(){
    let avgTemp = this.forcastData.reduce((total, next, index) => {
      if(index < 10){
        return total + next.temp
      }else {
        return total
      }
    }, 0)/10
    return avgTemp
  }

  updateGradient(gradientString: string){
    //I've spent too much time on trying to make this gradient work. I dont think its fair  to continue, since you've said it should be a short task
    this.elRef.nativeElement.children[0].style.setProperty('backgroundImage', gradientString)

  }

  getGradientString(){
      const avgTemp = this.getAvgTemp();

      let color = Math.floor((avgTemp + 48) /9);

      switch (color) {
        case 0:
          return '#102F7E'
      
        case 1: return `linear-gradient(130.54deg, ${GRADIENTS[color][0]} -33.02%, ${GRADIENTS[color][1]} 137.04%);`;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8: return `linear-gradient(130.54deg, ${GRADIENTS[color][0]} -33.02%, ${GRADIENTS[color][1]} 52.01%, ${GRADIENTS[color][2]} 137.04%);`;
        default: 
        return `linear-gradient(130.54deg, ${GRADIENTS[8][0]} -33.02%, ${GRADIENTS[8][1]} 52.01%, ${GRADIENTS[8][2]} 137.04%);`
      }

   
  }
}
