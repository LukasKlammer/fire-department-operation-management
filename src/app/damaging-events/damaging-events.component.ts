import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddDamagingEventComponent } from '../dialog-add-damaging-event/dialog-add-damaging-event.component';
import { DamagingEvent } from '../modules/damaging-event.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserSelectionsService } from '../shared/user-selections.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-damaging-events',
  templateUrl: './damaging-events.component.html',
  styleUrls: ['./damaging-events.component.scss']
})
export class DamagingEventsComponent implements OnInit {
  selectedDamagingEvent: DamagingEvent = new DamagingEvent();
  isEventSelected: boolean = false;
  isLoading: boolean = true;
  damagingEvents: DamagingEvent[] = [];


  constructor(public dialog: MatDialog, private firestore: AngularFirestore, public userSelections: UserSelectionsService) { }

  ngOnInit(): void {
    this
      .firestore
      .collection('ff-bruneck')
      .doc('QEcJgDBlPVt64GUFIPmw') // damaging events (FF Bruneck) document
      .collection('damaging-events')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.damagingEvents = changes;
        this.sortDamagingEvents();
        this.isLoading = false;

        // this.hasCompletetOperations$(this.damagingEvents[1])
        // .subscribe(result => console.log("Damaging Event 0 has Complete Operations :", result));
      });
  }

  private sortDamagingEvents() {
    this.damagingEvents.sort((a, b) => { return a.timestamp - b.timestamp });
  }

  public selectEvent(damagingEvent: DamagingEvent) {
    this.userSelections.isDamagingEventSelected = true;
    this.userSelections.selectedDamagingEvent.description = damagingEvent.description;
    this.userSelections.selectedDamagingEvent.timestamp = damagingEvent.timestamp;
  }

  public openDialog() {
    this.dialog.open(DialogAddDamagingEventComponent, {
      disableClose: true,
    });
  }

  public checkOpenOperations(customIdName: string) {

    console.log('aufruf');
    console.log(customIdName);
    return false;

  }

  hasCompletetOperations$(damagingEvent : DamagingEvent){
    return this.firestore
    .collection('ff-bruneck')
    .doc('QEcJgDBlPVt64GUFIPmw') // damaging events (FF Bruneck) document
    .collection('damaging-events')
    .doc(damagingEvent.customIdName)
    .collection('operations', ref => ref.where('status', '==', 'Abgeschlossen'))
    .valueChanges()
    .pipe(
      map(changes => changes.length > 0)
    );
  }
}
