import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Operation } from '../modules/operation.class';

@Component({
  selector: 'app-dialog-print',
  templateUrl: './dialog-print.component.html',
  styleUrls: ['./dialog-print.component.scss']
})
export class DialogPrintComponent implements OnInit {

  operation: Operation = new Operation();

  constructor(public dialogRef: MatDialogRef<DialogPrintComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
