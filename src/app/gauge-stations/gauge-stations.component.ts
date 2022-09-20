import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauge-stations',
  templateUrl: './gauge-stations.component.html',
  styleUrls: ['./gauge-stations.component.scss']
})
export class GaugeStationsComponent implements OnInit {
  url: string = 'http://daten.buergernetz.bz.it/services/weather/station?categoryId=2&lang=de&format=json'
  stationsData: any[] = [];
  interval: any;
  flowLevelBruneck: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.startPeriodicReloading();
    this.fetchStationsData();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startPeriodicReloading() { // to re-fetch data every 10 minutes
    this.interval = setInterval(() => {
      this.fetchStationsData();
    }, 600000)
  }

  async fetchStationsData() {
    try {
      let response = await fetch(this.url);
      let responseAsJson = await response.json();
      this.stationsData = responseAsJson.rows;
      console.log(this.stationsData);
      this.calculateFlowLevels()
    } catch (e) {
      console.log('error while loading resource: ' + e);
    }
  }

  calculateFlowLevels() {
    this.flowLevelBruneck = this.stationsData[12].q - this.stationsData[5].q;
  }
}
