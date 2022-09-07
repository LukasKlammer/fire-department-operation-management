import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-alert-beingedited',
  templateUrl: './dialog-alert-beingedited.component.html',
  styleUrls: ['./dialog-alert-beingedited.component.scss']
})
export class DialogAlertBeingeditedComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAlertBeingeditedComponent>,
  ) { }

  ngOnInit(): void {
  }

}
