import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditOperationComponent } from '../dialog-edit-operation/dialog-edit-operation.component';
import { Operation } from '../modules/operation.class';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

  isLoading:boolean = true;
  operations: Operation[] = [
    new Operation(),
    new Operation(),
  ]

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this
      .firestore
      .collection('ff-bruneck')
      .doc('QEcJgDBlPVt64GUFIPmw') // damaging events document FF Bruneck
      .collection('damaging-events')
      .doc('rqw6vs0TciyU3HfDLhgh') // first damaging event (Sturmtief Vaia)
      .collection('operations')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('received changes from DB: ', changes);
        this.operations = changes;
        this.sortOperations();
        this.isLoading = false;
      });
  }

  private sortOperations() {
    this.operations.sort((a, b) => { return a.timestamp - b.timestamp });
  }

  public openDialog() {
    this.dialog.open(DialogEditOperationComponent, {
      disableClose: true,
      width: '90vw',
      height: '90vh',
    });
  }

}
