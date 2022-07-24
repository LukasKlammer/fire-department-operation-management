import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { DamagingEvent } from '../modules/damaging-event.class';

@Component({
  selector: 'app-dialog-add-damaging-event',
  templateUrl: './dialog-add-damaging-event.component.html',
  styleUrls: ['./dialog-add-damaging-event.component.scss']
})
export class DialogAddDamagingEventComponent implements OnInit {

  isLoading: boolean = false;
  damagingEvent: DamagingEvent = new DamagingEvent();

  constructor(public dialogRef: MatDialogRef<DialogAddDamagingEventComponent>, private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
  }

  public generateNewMission(ngForm: any) {
    if (ngForm.submitted && ngForm.form.valid) {
      console.log('neues Schadensereignis als JSON erstellt: ', this.damagingEvent.toJSON());

      this.firestore
      .collection('ff-bruneck')
      .doc('QEcJgDBlPVt64GUFIPmw') //damaging events (FF Bruneck) document
      .collection('damaging-events')
      .add(this.damagingEvent.toJSON())
      .then((result: any) => {
          console.log('Adding user finished: ' , result);
          this.isLoading = false;
          this.dialogRef.close();
        })

        // this.dialogRef.close();
      }

  }

}
