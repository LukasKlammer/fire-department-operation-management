import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { DamagingEvent } from '../models/damaging-event.class';
import { UserSelectionsService } from '../shared/user-selections.service';

@Component({
  selector: 'app-dialog-add-damaging-event',
  templateUrl: './dialog-add-damaging-event.component.html',
  styleUrls: ['./dialog-add-damaging-event.component.scss']
})
export class DialogAddDamagingEventComponent implements OnInit {

  isLoading: boolean = false;
  isSaveClicked: boolean = false;
  damagingEvent: DamagingEvent = new DamagingEvent();

  constructor(public dialogRef: MatDialogRef<DialogAddDamagingEventComponent>, private firestore: AngularFirestore, public userSelections: UserSelectionsService) {
  }

  ngOnInit(): void {
  }

  public generateNewDamagingEvent(ngForm: any) {
    if (ngForm.submitted && ngForm.form.valid && this.isSaveClicked) {
      this.isLoading = true;
      this.firestore
        .collection('ff-bruneck')
        .doc('QEcJgDBlPVt64GUFIPmw') // damaging events (FF Bruneck) document
        .collection('damaging-events')
        .add(this.damagingEvent.toJSON())
        .then((result: any) => {
          this.setLastAddedDamagingEvent(result.id);
          this.isLoading = false;
          this.dialogRef.close();
        })
    }
  }

  private setLastAddedDamagingEvent(id: string) {
    this.firestore
      .collection('ff-bruneck')
      .doc('QEcJgDBlPVt64GUFIPmw') // damaging events (FF Bruneck) document
      .update({ lastAddedDamagingEvent: id })
  }

  public onNoClick(): void {
    this.isSaveClicked = false;
    this.dialogRef.close();
  }

}
