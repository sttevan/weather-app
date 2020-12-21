import { Component, OnInit, Input } from '@angular/core';

const MONTHS = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

@Component({
  selector: 'app-temp-card',
  templateUrl: './temp-card.component.html',
  styleUrls: ['./temp-card.component.scss']
})

export class TempCardComponent implements OnInit {
  @Input() temp?: number;
  @Input() date?: string;
  dateRangeTitle: string = '';

  constructor() { }

  ngOnInit(): void {
    this.dateRangeTitle = this.date ?  this.getDateTitle(this.date) : "Forcast for the next 7 days";
  }

  getDateTitle(date:string ){
    const firstDay = new Date(date);
    const lastDay = new Date(date);
    lastDay.setDate(lastDay.getDate() + 7);
    if(firstDay.getDate() > lastDay.getDate()){
      return `${MONTHS[firstDay.getMonth()]} ${firstDay.getDate()} ${firstDay.getFullYear()} - ${MONTHS[lastDay.getMonth()]} ${lastDay.getDate()} ${lastDay.getFullYear()}`
    }else {
      return `${MONTHS[firstDay.getMonth()]} ${firstDay.getDate()} - ${lastDay.getDate()} ${lastDay.getFullYear()}` 
    }
    
  }
}
