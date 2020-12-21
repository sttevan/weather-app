import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-temp-card-small',
  templateUrl: './temp-card-small.component.html',
  styleUrls: ['./temp-card-small.component.scss']
})
export class TempCardSmallComponent implements OnInit {
  @Input() forcastInfo?: Array<any>;
  public shortInfo: Array<any> | undefined  = [] ;
  constructor() { }

  ngOnInit(): void {
   this.shortInfo =  this.forcastInfo?.splice(0,7)
  }

  trackByFn(index: number) {
    return index;
  }

}
