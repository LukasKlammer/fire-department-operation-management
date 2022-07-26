import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Operation } from '../modules/operation.class';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserSelectionsService } from '../shared/user-selections.service';
import { FirestationService } from '../shared/firestation.service';

@Component({
  selector: 'app-dialog-edit-operation',
  templateUrl: './dialog-edit-operation.component.html',
  styleUrls: ['./dialog-edit-operation.component.scss']
})
export class DialogEditOperationComponent implements OnInit {

  operation: Operation = new Operation();
  isLoading: boolean = false;
  priorities: string[] = ['hoch', 'mittel', 'niedrig'];
  status: string[] = ['Offen', 'Läuft', 'Abgeschlossen'];
  isExistingOperation: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEditOperationComponent>,
    public firestationService: FirestationService,
    private firestore: AngularFirestore,
    public userSelections: UserSelectionsService,
  ) { }

  ngOnInit(): void {

  }

  public saveOperation(ngForm: any) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.isLoading = true;
      this.firestationService.save();
      if (this.isExistingOperation) { // if operation already exists
        this.editOperationInFirestore(); // operation is to edit in firestore
      } else {
        this.addOperationToFirestore(); // operation is new --> add to firestore
      }
    }
  }

  private addOperationToFirestore() {
    this.firestore
      .collection('ff-bruneck')
      .doc('QEcJgDBlPVt64GUFIPmw') // damaging events (FF Bruneck) document
      .collection('damaging-events')
      .doc(this.userSelections.selectedDamagingEvent.customIdName) // actual opened damaging event
      .collection('operations')
      .add(this.operation.toJSON())
      .then((result: any) => {
        console.log('Adding user finished: ', result);
        this.isLoading = false;
        this.dialogRef.close();
      })
  }

  private editOperationInFirestore() {
    this.firestore
      .collection('ff-bruneck')
      .doc('QEcJgDBlPVt64GUFIPmw') // damaging events (FF Bruneck) document
      .collection('damaging-events')
      .doc(this.userSelections.selectedDamagingEvent.customIdName) // actual opened damaging event
      .collection('operations')
      .doc(this.operation.customIdName)
      .update(this.operation.toJSON())
      .then((result: any) => {
        this.isLoading = false;
        this.dialogRef.close();
      })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.firestationService.sort();
      this.operation.sortVehicles();
    }
  }
}
