import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestationService {

  availableVehicles:string[] = ['Atem', 'Deko', 'Fahrzeug 1', 'Fahrzeug 2', 'Fahrzeug 3', 'Fahrzeug 4', 'Fahrzeug 5', 'Fahrzeug 7', 'GSF', 'Kommando', 'Last 1', 'Last 2', 'Leiter', 'Lösch', 'Lüfter', 'Rüst', 'Strom', 'Tank 1', 'Tank 2', 'Tank 3', 'Voraus'];

  constructor(private firestore: AngularFirestore) { }

  public sort() {
    this.availableVehicles.sort((a, b) => a.localeCompare(b));
  }

  public save() {
    this.firestore
      .collection('ff-bruneck')
      .doc('JA1pXXbwRSly3DsQ3kni') // Document firestation
      .collection('firestation')
      .add(this.toJSON())
      .then((result: any) => {
        console.log('Adding firestation completed: ', result);
      })
  }

  public toJSON() : any {
    return {
      availableVehicles: this.availableVehicles,
    }
  }
}
