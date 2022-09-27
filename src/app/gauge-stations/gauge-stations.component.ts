import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauge-stations',
  templateUrl: './gauge-stations.component.html',
  styleUrls: ['./gauge-stations.component.scss']
})
export class GaugeStationsComponent implements OnInit {
  url: string = 'http://daten.buergernetz.bz.it/services/weather/station?categoryId=2&lang=de&format=json'
  allStations: any[] = [];
  initialStationsNames: string[] = ['AHR BEI ST.GEORGEN', 'RIENZ BEI STEGEN'];
  selectedStationsNames: string[] = [];
  selectedStationsData: any[] = [];
  interval: any;
  flowLevelBruneck: number = 0;
  showInitButton: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.initData();
    this.startPeriodicReloading();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startPeriodicReloading() { // to re-fetch data every x minutes
    this.interval = setInterval(() => {
      this.initData();
    }, 300000)
  }

  async initData() {
    await this.fetchStationsData();
    this.prepareData();
    this.initSelectedStations();
    this.calculateFlowBruneck();
    this.addAlertThresholds();
  }

  async fetchStationsData() {
    try {
      let response = await fetch(this.url);
      let responseAsJson = await response.json();
      this.allStations = this.sortStations(responseAsJson.rows);
    } catch (e) {
      console.error('error while loading resource: ' + e);
    }
  }

  prepareData() {
    this.convertGeoLocation();
    this.roundFlow();
  }

  sortStations(stations: any[]) {
    return stations.sort((a, b) => {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    });
  }

  roundFlow() {
    this.allStations.map((station) => {
      station.q = Math.round(station.q);
    })
  }

  calculateFlowBruneck() {
    let riverRienz = this.getStationByName('RIENZ BEI STEGEN');
    let riverAhr = this.getStationByName('AHR BEI ST.GEORGEN');
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

  checkShowInitButton() {
    if (this.arraysEqual(this.selectedStationsNames, this.initialStationsNames)) {
      this.showInitButton = false;
    } else {
      this.showInitButton = true;
    }
  }

  arraysEqual(a: string[], b: string[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    // If you don't care about the order of the elements inside the array, you should sort both arrays here.
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  addAlertThresholds() {
    for (let i = 0; i < this.allStations.length; i++) {
      let station = this.allStations[i];
      if (station.name == 'RIENZ BEI STEGEN') {
        station['preAlertThreshold'] = 300;
        station['alertThreshold'] = 350;
      }
      if (station.name == 'AHR BEI ST.GEORGEN') {
        station['preAlertThreshold'] = 260;
        station['alertThreshold'] = 290;
      }
    }
  }

  initSelectedStations() {
    this.selectedStationsNames = this.initialStationsNames;
    this.getSelectedStations();
    this.showInitButton = false;
  }

  convertGeoLocation() {
    this.allStations.map((station) => {
      station.latitude = station.latitude.replace(',', '.');
      station.longitude = station.longitude.replace(',', '.');
    })
  }
}
