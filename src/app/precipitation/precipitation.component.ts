import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-precipitation',
  templateUrl: './precipitation.component.html',
  styleUrls: ['./precipitation.component.scss']
})
export class PrecipitationComponent implements OnInit {
  radarImageNumber: number = 1;
  timeStamp: number = new Date().getTime();
  RADAR_IMAGE_SOURCE: string = `https://wetter.provinz.bz.it/images/fileN2_d_`;  // base url from this source: http://daten.buergernetz.bz.it/de/dataset/southtyrolean-weatherservice-precipitationradar
  PRECIPITATION_SUM_SOURCE: string = 'https://wetter.provinz.bz.it/images/pluvio/Pluvio24.png';
  radarImageUrl: string = '';
  precipitationSumImageUrl: string = '';

  constructor() { }

  ngOnInit(): void {
    this.setRadarImageUrl();
    this.setPrecipitationImageUrl();
    this.animateRadarImages();
    this.refreshTimeStampAndPrecipitation();
  }

  ngOnDestroy(): void {
    this.clearAllIntervals();
  }

  refreshTimeStampAndPrecipitation() { // to change image urls every x seconds (2 Minutes)
    setInterval(() => {
      this.timeStamp = new Date().getTime();
      this.setPrecipitationImageUrl();
    }, 120000)
  }

  animateRadarImages() {
    setInterval(() => {
      this.nextRadarImageNumber();
      this.setRadarImageUrl();
    }, 500)
  }

  setRadarImageUrl() {
    this.radarImageUrl = `${this.RADAR_IMAGE_SOURCE}${this.radarImageNumber}.png?${this.timeStamp}`;
  }

  setPrecipitationImageUrl() {
    this.precipitationSumImageUrl = `${this.PRECIPITATION_SUM_SOURCE}?${this.timeStamp}`;
  }

  nextRadarImageNumber() {
    if (this.radarImageNumber < 15) {
      this.radarImageNumber++;
    } else {
      this.radarImageNumber = 1;
    }
  }

  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

}
