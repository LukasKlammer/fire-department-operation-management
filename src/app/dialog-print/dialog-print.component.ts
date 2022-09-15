import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Operation } from '../models/operation.class';

@Component({
  selector: 'app-dialog-print',
  templateUrl: './dialog-print.component.html',
  styleUrls: ['./dialog-print.component.scss']
})
export class DialogPrintComponent {

  operation: Operation = new Operation();

  constructor(public dialogRef: MatDialogRef<DialogPrintComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
