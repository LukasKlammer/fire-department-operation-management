import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauge-stations',
  templateUrl: './gauge-stations.component.html',
  styleUrls: ['./gauge-stations.component.scss']
})
export class GaugeStationsComponent implements OnInit {
  url: string = 'http://daten.buergernetz.bz.it/services/weather/station?categoryId=2&lang=de&format=json'
  allStations: any[] = [];
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
    this.interval = setInterval(() => {
      this.initData();
    }, 600000)
  }

  async initData() {
    await this.fetchStationsData();
    this.getSelectedStations();
    this.calculateFlowLevels();
    this.addAlertThresholds();
  }

  async fetchStationsData() {
    try {
      let response = await fetch(this.url);
      let responseAsJson = await response.json();
      this.allStations = responseAsJson.rows;
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
    return this.allStations.find((item) => {
      return item.name == name;
    })
  }

  getSelectedStations() {
    this.selectedStationsData = this.allStations.filter((station) => {
      return this.selectedStationsNames.includes(station.name);
    })
  }

  addAlertThresholds() {
    for (let i = 0; i < this.allStations.length; i++) {
      let station = this.allStations[i];
      if (station.name == 'RIENZ BEI STEGEN') {
        station['preAlertThreshold'] = 300;
        station['alertThreshold'] = 350;
      }
    }
  }
}
