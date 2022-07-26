import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestationService {

  availableVehicles: string[] = [];

  constructor(private firestore: AngularFirestore) {
    this.firestore
      .collection('ff-bruneck')
      .doc('JA1pXXbwRSly3DsQ3kni') // document firestation
      .collection('firestation')
      .valueChanges()
      .subscribe((changes: any) => {
        this.availableVehicles = changes[0].availableVehicles;
        console.log('Änderung bei verfügbaren Fahrzeugen in DB erkannt: ', this.availableVehicles);
      });
  }

  public sort() {
    this.availableVehicles.sort((a, b) => a.localeCompare(b));
  }

  public save() {
    this.firestore
      .collection('ff-bruneck')
      .doc('JA1pXXbwRSly3DsQ3kni') // document firestation
      .collection('firestation')
      .doc('7Nokj2Z615087RasEqTC') // document with current status of firestation
      .update(this.toJSON())
      .then((result: any) => {
        console.log('saving firestation completed: ', result);
      })
  }

  public toJSON(): any {
    return {
      availableVehicles: this.availableVehicles,
    }
  }
}
