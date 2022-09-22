import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-precipitation',
  templateUrl: './precipitation.component.html',
  styleUrls: ['./precipitation.component.scss']
})
export class PrecipitationComponent implements OnInit {
  interval: any;

  constructor() { }

  ngOnInit(): void {
    this.startPeriodicReloading();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startPeriodicReloading() { // to re-fetch data every x minutes
    this.interval = setInterval(() => {
      console.log('periodic call function');
    }, 300000)
  }

}
