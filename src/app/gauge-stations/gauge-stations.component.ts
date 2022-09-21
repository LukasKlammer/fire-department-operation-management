import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauge-stations',
  templateUrl: './gauge-stations.component.html',
  styleUrls: ['./gauge-stations.component.scss']
})
export class GaugeStationsComponent implements OnInit {
  url: string = 'http://daten.buergernetz.bz.it/services/weather/station?categoryId=2&lang=de&format=json'
  fetchedStations: any[] = [];
  selectedStationsNames: string[] = ['AHR BEI ST.GEORGEN', 'RIENZ BEI STEGEN'];
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
    this.getSelectedStations();
    this.calculateFlowLevels()
  }

  async fetchStationsData() {
    try {
      let response = await fetch(this.url);
      let responseAsJson = await response.json();
      this.fetchedStations = responseAsJson.rows;
    } catch (e) {
      console.error('error while loading resource: ' + e);
    }
  }

  calculateFlowLevels() {
    let riverAhr = this.getStationByName('AHR BEI ST.GEORGEN');
    let riverRienz = this.getStationByName('RIENZ BEI STEGEN');
    this.flowLevelBruneck = riverRienz.q - riverAhr.q;
  }

  getStationByName(name: string) {
    return this.fetchedStations.find((item) => {
      return item.name == name;
    })
  }

  getSelectedStations() {
    // for (let i = 0; i < this.selectedStations.length; i++) {
    //   let stationName = this.selectedStations[i];
    //   for (let j = 0; j < this.stationsData.length; j++) {
    //     if (this.stationsData[j].name == stationName) {
    //       this.selectedStationsData.push(this.stationsData[j]);
    //     }
    //   }
    // }
    this.selectedStationsData = this.fetchedStations.filter((item) => {
      return this.selectedStationsNames.includes(item.name);
    })
  }
}
