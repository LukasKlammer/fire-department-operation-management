import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauge-stations',
  templateUrl: './gauge-stations.component.html',
  styleUrls: ['./gauge-stations.component.scss']
})
export class GaugeStationsComponent implements OnInit {
  url: string = 'http://daten.buergernetz.bz.it/services/weather/station?categoryId=2&lang=de&format=json'
  fetchedStationsData: any[] = [];
  selectedStations: string[] = ['AHR BEI ST.GEORGEN', 'RIENZ BEI STEGEN'];
  selectedStationsData: any[] = [];
  interval: any;
  flowLevelBruneck: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.initData();
    this.startPeriodicReloading();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startPeriodicReloading() { // to re-fetch data every 10 minutes
    this.interval = setInterval( () => {
      this.initData();
    }, 600000)
  }

  async initData() {
    await this.fetchStationsData();
    this.getSelectedStationsData();
    this.calculateFlowLevels()
  }

  async fetchStationsData() {
    try {
      let response = await fetch(this.url);
      let responseAsJson = await response.json();
      this.fetchedStationsData = responseAsJson.rows;
      console.log(this.fetchedStationsData);
    } catch (e) {
      console.log('error while loading resource: ' + e);
    }
  }

  calculateFlowLevels() {
    this.flowLevelBruneck = this.fetchedStationsData[12].q - this.fetchedStationsData[5].q;
  }

  getSelectedStationsData() {
    // for (let i = 0; i < this.selectedStations.length; i++) {
    //   let stationName = this.selectedStations[i];
    //   for (let j = 0; j < this.stationsData.length; j++) {
    //     if (this.stationsData[j].name == stationName) {
    //       this.selectedStationsData.push(this.stationsData[j]);
    //     }
    //   }
    // }
    this.selectedStationsData = this.fetchedStationsData.filter((item) => {
      return this.selectedStations.includes(item.name);
    })
    console.log(this.selectedStationsData);
  }
}
