import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';

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
      })
  }

  public restoreFromFirebase() {
    this.firestore
      .collection('ff-bruneck')
      .doc('JA1pXXbwRSly3DsQ3kni') // document firestation
      .collection('firestation')
      .ref
      .get()
      .then((snapshot: any) => {
        snapshot.forEach((doc:any) => {
          this.availableVehicles = doc.data().availableVehicles;
        });
      })
  }

  public toJSON(): any {
    return {
      availableVehicles: this.availableVehicles,
    }
  }
}
