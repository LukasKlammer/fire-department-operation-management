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
  isSaveClicked: boolean = false;
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
    if (ngForm.submitted && ngForm.form.valid && this.isSaveClicked) {
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

  public drop(event: CdkDragDrop<string[]>) {
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

  public onNoClick(): void {
    this.isSaveClicked = false;
    this.firestationService.restoreFromFirebase();
    this.undoChangesInForm();
    this.dialogRef.close();
  }

  /**
   * this function undos changes in the form: we must reset the vehicles array with data from firebase,
   * because the drag and drop modifies our array immediatly, also if user don't want to save his changes
   */
  private undoChangesInForm() {
    this.isLoading = true;
    this.firestore
      .collection('ff-bruneck')
      .doc('QEcJgDBlPVt64GUFIPmw') // damaging events (FF Bruneck) document
      .collection('damaging-events')
      .doc(this.userSelections.selectedDamagingEvent.customIdName) // actual opened damaging event
      .collection('operations')
      .doc(this.operation.customIdName)
      .ref
      .get()
      .then((snapshot: any) => {
        this.operation.vehicles = snapshot.data().vehicles;
        this.updateOperationVehicles();
      })
  }

  private updateOperationVehicles() {
    this.firestore
      .collection('ff-bruneck')
      .doc('QEcJgDBlPVt64GUFIPmw') // damaging events (FF Bruneck) document
      .collection('damaging-events')
      .doc(this.userSelections.selectedDamagingEvent.customIdName) // actual opened damaging event
      .collection('operations')
      .doc(this.operation.customIdName)
      .update({
        'vehicles': this.operation.vehicles
      })
      .then((result: any) => {
        this.isLoading = false;
      })
  }

}
