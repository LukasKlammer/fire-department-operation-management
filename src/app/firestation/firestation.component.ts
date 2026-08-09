import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FirestationRoster } from '../models/firestation-roster';
import { FirestationService } from '../shared/firestation.service';

@Component({
  selector: 'app-firestation',
  templateUrl: './firestation.component.html',
  styleUrls: ['./firestation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FirestationComponent implements OnInit {

  readonly rosterRows = FirestationRoster.rows;

  constructor(
    public firestationService: FirestationService,
  ) { }

  ngOnInit(): void {
  }

  public isVehicleAvailable(vehicle: string) {
    const availableVehicles = this.firestationService.availableVehicles;
    if (availableVehicles.includes(vehicle)) {
      return true;
    } else {
      return false;
    }
  }
}
