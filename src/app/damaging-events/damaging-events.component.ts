import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddDamagingEventComponent } from '../dialog-add-damaging-event/dialog-add-damaging-event.component';
import { DamagingEvent } from '../modules/damaging-event.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-damaging-events',
  templateUrl: './damaging-events.component.html',
  styleUrls: ['./damaging-events.component.scss']
})
export class DamagingEventsComponent implements OnInit {
  selectedDamagingEvent: DamagingEvent = new DamagingEvent();
  isEventSelected: boolean = false;

  damagingEvents: DamagingEvent[] = [
    new DamagingEvent({
      description: 'Sturm über Bruneck',
      timestamp: 1607110465663,
    })
    ,
    new DamagingEvent({
      description: 'Starkregen mit Hagel',
      timestamp: 1607110465663,
    })
  ];


  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this
      .firestore
      .collection('ff-bruneck')
      .doc('QEcJgDBlPVt64GUFIPmw') //damaging events (FF Bruneck) document
      .collection('damaging-events')
      .valueChanges( { idField: 'customIdName' } )
      .subscribe((changes: any) => {
        console.log('received changes from DB', changes);
        this.damagingEvents = changes;
        this.sortDamagingEvents();
      });
  }

  sortDamagingEvents() {
    this.damagingEvents.sort((a, b) => { return a.timestamp - b.timestamp });
  }

  selectEvent() {
    this.isEventSelected = true;
  }

  openDialog() {
    this.dialog.open(DialogAddDamagingEventComponent, {
      disableClose: true,
    });
  }



}
