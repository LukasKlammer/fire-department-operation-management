import { Component, OnInit } from '@angular/core';
import { FirestationService } from '../shared/firestation.service';

@Component({
  selector: 'app-firestation',
  templateUrl: './firestation.component.html',
  styleUrls: ['./firestation.component.scss']
})
export class FirestationComponent implements OnInit {

  constructor(
    public firestationService: FirestationService,
  ) { }

  ngOnInit(): void {
  }

}
