import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FirestationService } from '../shared/firestation.service';

@Component({
  selector: 'app-firestation',
  templateUrl: './firestation.component.html',
  styleUrls: ['./firestation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FirestationComponent implements OnInit {

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
