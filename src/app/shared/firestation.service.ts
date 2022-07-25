import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirestationService {

  availableVehicles:string[] = ['Atem', 'Deko', 'Fahrzeug 1', 'Fahrzeug 2', 'Fahrzeug 3', 'Fahrzeug 4', 'Fahrzeug 5', 'Fahrzeug 7', 'GSF', 'Kommando', 'Last 1', 'Last 2', 'Leiter', 'Lösch', 'Lüfter', 'Rüst', 'Strom', 'Tank 1', 'Tank 2', 'Tank 3', 'Voraus'];
  unAvailableVehicles:string[] = [];

  availableContainers:string[] = [];
  unAvailableContainers:string[] = [];

  constructor() { }

  public sort() {
    this.availableVehicles.sort((a, b) => a.localeCompare(b));
    this.unAvailableVehicles.sort((a, b) => a.localeCompare(b));
    this.availableContainers.sort((a, b) => a.localeCompare(b));
    this.unAvailableContainers.sort((a, b) => a.localeCompare(b));
  }
}
