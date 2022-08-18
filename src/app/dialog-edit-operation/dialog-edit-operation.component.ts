import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Operation } from '../models/operation.class';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserSelectionsService } from '../shared/user-selections.service';
import { FirestationService } from '../shared/firestation.service';
import { DialogPrintComponent } from '../dialog-print/dialog-print.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-edit-operation',
  templateUrl: './dialog-edit-operation.component.html',
  styleUrls: ['./dialog-edit-operation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogEditOperationComponent implements OnInit {

  operation: Operation = new Operation();
  isLoading: boolean = false;
  isSaveClicked: boolean = false;
  isExistingOperation: boolean = false;
  shouldPrint: boolean = false;
  priorities: string[] = ['hoch', 'mittel', 'niedrig'];
  status: string[] = ['Offen', 'Läuft', 'Abgeschlossen'];
  myControl = new FormControl('');
  keywords: string[] = ["ANDERE/SONSTIGE", "ALARMIERUNG BEZ", "ALARMIERUNG LEZ", "ALTERSHEIM", "ANDERE-SONSTIGE", "ANFORDERUNG LEITER/STEIGER", "ANFORDERUNG SONDERFAHRZEUG", "ANFORDERUNG SONDERGERÄT", "AST/BAUM/BAUTEIL", "AUFSTIEGSANLAGEN", "AUSFALL TELEFON/STROM", "BAUSTELLE", "BERGUNG FAHRZEUG", "BERGUNG SCHWERFAHRZEUG", "BRAND MIT ATOMAREN GEFAHREN", "BRAND MIT BIOLOGISCHEN GEFAHREN", "BRAND MIT CHEMISCHEN GEFAHREN", "BRENNSTOFFLAGER", "BÜRO/DIENSTLEISTUNG", "DEICHWACHE", "EISENBAHN", "EISENBAHNUNFALL", "ELEKTROANLAGE", "ENTSCHEIDUNG EINSATZ", "ENTSCHEIDUNG SUCHAKTION", "ERDRUTSCH/STEINSCHLAG", "EXPLOSION", "FAHRZEUG", "FELSSTURZ", "FLUGZEUGABSTURZ", "GASAUSTRITT IM FREIEN", "GASAUSTRITT IM GEBÄUDE", "GASGERUCH IM GEBÄUDE", "GASGERUCH IN FREIEN", "GEBÄUDEEINSTURZ", "GROSSTIERRETTUNG", "HANDEL/LAGER", "HANDWERK", "HOTEL GASTGEWERBE", "IM FREIEN", "IN GEBÄUDE", "INDUSTRIE", "INSEKTENBEKÄMPFUNG", "KAMIN", "KLÄRANLAGE", "KRANKENHAUS", "LANDWIRTSCHAFT", "LAWINENABGANG", "LAWINENABGANG OHNE PERSONEN", "LKW/BUS", "LOTSENDIENST RTH", "MASSENUNFALL", "MEHRERE KFZ", "MELDERALARM", "MÜLLCONTAINER", "MÜLLDEPONIE", "OBSTMAGAZIN", "ÖL GEWÄSSER", "ÖLUNFALL", "PEGELMESSSTELLE", "PERSON EINGEKLEMMT", "PERSON IM WASSER", "PERSON IN AUFZUG", "PERSON IN GEFAHR", "PERSON UNTER KFZ", "PERSON UNTER ZUG", "PERSON VERSCHÜTTET", "PKW IM WASSER", "RAUCHENTWICKLUNG", "RECYCLINGHOF", "REINIGUNG KANAL", "SCHULE/KINDERGARTEN", "SICHERN/ABSPERREN", "STRASSENREINIGUNG", "STROMUNFALL", "SUCHE UND BERGUNG IM WASSER", "TANKSTELLE", "TECHN EINSATZ ATOMARE GEFAHREN", "TECHN EINSATZ BIOLOG GEFAHREN", "TECHN EINSATZ CHEMISCHE GEFAHREN", "TIEFGARAGE", "TIERRETTUNG", "TÜRÖFFNUNG", "TUNNEL", "ÜBERSCHWEMMUNG", "UNTERSTÜTZUNG ANDERE ORGANISATION", "UNWETTER", "VERANSTALTUNGSORT", "VU BUS MIT EINGEKL PERSONEN", "VU BUS OHNE EINGEKL PERSONEN", "VU LKW MIT EINGEKLEMMTEN PERSONEN", "VU LKW OHNE EINGEKL PERSONEN", "VU MEHRERE LKW", "VU MIT EINGEKLEMMTEN PERSONEN", "VU OHNE EINGEKLEMMTE PERSON", "WALD", "WASSERSCHADEN", "WIESE/BÖSCHUNG", "WOHNGEBÄUDE"];
  filteredKeywords!: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<DialogEditOperationComponent>,
    public firestationService: FirestationService,
    private firestore: AngularFirestore,
    public userSelections: UserSelectionsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.filteredKeywords = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.keywords.filter(keyword => keyword.toLowerCase().includes(filterValue));
  }

  public submit(ngForm: any) {
    if (ngForm.submitted && ngForm.form.valid && this.isSaveClicked) { // checks, if form is valid and submitted and if a save button is clicked
      this.isLoading = true;
      this.firestationService.save();
      if (this.isExistingOperation) { // if operation already exists
        this.editOperationInFirestore(); // operation is to edit in firestore
      } else {
        this.addOperationToFirestore(); // operation is new --> add to firestore
      }
      if (this.shouldPrint) {
        this.openPrintDialog();
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
      // this.operation.allUsedVehicles.push();
    }
  }

  public onNoClick(): void {
    this.isSaveClicked = false;
    this.firestationService.restoreFromFirebase();
    if (this.operation.customIdName != '') {
      this.undoChangesInForm();
    }
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

  public setConclusionTime() {
    this.operation.conclusionTime = new Date().getTime();
  }

  private openPrintDialog() {
    const dialog = this.dialog.open(DialogPrintComponent, {
      disableClose: true,
    });
    dialog.componentInstance.operation = new Operation(this.operation);
  }

}
