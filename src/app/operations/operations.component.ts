import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogEditOperationComponent } from '../dialog-edit-operation/dialog-edit-operation.component';
import { Operation } from '../modules/operation.class';
import { UserSelectionsService } from '../shared/user-selections.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

  damagingEventId: string = '';
  isLoading: boolean = true;
  operations: Operation[] = [];
  openOperations: Operation[] = [];
  ongoingOperations: Operation[] = [];
  completedOperations: Operation[] = [];


  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    public userSelections: UserSelectionsService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get('id');
      if (typeof id === 'string') {
        this.damagingEventId = id;
        this.setDamagingEventByUrl();
        this.getOperations();
      }
    })
  }

  private setDamagingEventByUrl() {
    this
    .firestore
    .collection('ff-bruneck')
    .doc('QEcJgDBlPVt64GUFIPmw') // damaging events document FF Bruneck
    .collection('damaging-events')
    .doc(this.damagingEventId) // damaging event from url
    .valueChanges( { idField: 'customIdName' } )
    .subscribe((changes: any) => {
      if (changes.timestamp) { // checks, if there is something in database for this url / id
        this.userSelections.selectedDamagingEvent = changes;
        this.userSelections.isDamagingEventSelected = true;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  private getOperations() {
    this
      .firestore
      .collection('ff-bruneck')
      .doc('QEcJgDBlPVt64GUFIPmw') // damaging events document FF Bruneck
      .collection('damaging-events')
      .doc(this.damagingEventId) // damaging event from url
      .collection('operations')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('received changes from DB: ', changes);
        this.operations = changes;
        this.splitOperations();
        this.sortAllOperations();
        this.isLoading = false;
      });
  }


  private splitOperations() {
    this.openOperations = [];
    this.ongoingOperations = [];
    this.completedOperations = [];
    for (let i = 0; i < this.operations.length; i++) {
      let operation = this.operations[i];
      switch (operation.status) {
        case 'Offen':
          this.openOperations.push(operation);
          break;
        case 'Läuft':
          this.ongoingOperations.push(operation);
          break;
        case 'Abgeschlossen':
          this.completedOperations.push(operation);
          break;
        default:
          break;
      }
    }
  }

  private sortAllOperations() {
    this.openOperations.sort((a, b) => a.priority.localeCompare(b.priority));
    this.ongoingOperations.sort((a, b) => a.priority.localeCompare(b.priority));
    this.completedOperations.sort((a, b) => a.priority.localeCompare(b.priority));
  }

  public openDialog() {
    this.dialog.open(DialogEditOperationComponent, {
      disableClose: true,
      width: '90vw',
      height: '90vh',
    });
  }

}
