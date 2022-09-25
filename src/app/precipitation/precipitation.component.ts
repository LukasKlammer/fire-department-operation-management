import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-precipitation',
  templateUrl: './precipitation.component.html',
  styleUrls: ['./precipitation.component.scss']
})
export class PrecipitationComponent implements OnInit {
  interval: any;
  radarImageUrl : string = `https://wetter.provinz.bz.it/images/fileN2_d_13.png?${new Date().getTime()}`;
  precipitationSumImageUrl : string = `https://wetter.provinz.bz.it/images/pluvio/Pluvio24.png?${new Date().getTime()}`;

  constructor() { }

  ngOnInit(): void {
    this.startPeriodicReloading();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startPeriodicReloading() { // to re-fetch data every x minutes
    this.interval = setInterval(() => {
      this.radarImageUrl = `https://wetter.provinz.bz.it/images/fileN2_d_13.png?${new Date().getTime()}`;
      this.precipitationSumImageUrl = `https://wetter.provinz.bz.it/images/pluvio/Pluvio24.png?${new Date().getTime()}`;
    }, 300000)
  }

}
