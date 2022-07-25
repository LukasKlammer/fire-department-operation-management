import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Operation } from '../modules/operation.class';
import { VehiclesService } from '../shared/vehicles.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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


  constructor(public dialogRef: MatDialogRef<DialogEditOperationComponent>, public vehiclesService: VehiclesService, private firestore: AngularFirestore) { }

  ngOnInit(): void {

  }

  public saveOperation(ngForm: any) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.isLoading = true;
      console.log('Einsatz als JSON: ', this.operation.toJSON());

      this.firestore
        .collection('ff-bruneck')
        .doc('QEcJgDBlPVt64GUFIPmw') // damaging events (FF Bruneck) document
        .collection('damaging-events')
        .doc('rqw6vs0TciyU3HfDLhgh') // sample for actuel opened damagin event (we need a variable)
        .collection('operations')
        .add(this.operation.toJSON())
        .then((result: any) => {
          console.log('Adding user finished: ', result);
          this.isLoading = false;
          this.dialogRef.close();
        })
    }
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
    }

  }

}
