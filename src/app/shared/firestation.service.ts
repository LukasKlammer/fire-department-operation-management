import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestationRoster } from '../models/firestation-roster';

@Injectable({
  providedIn: 'root'
})
export class FirestationService {

  availableVehicles: string[] = [];
  private readonly firestationDocument = this.firestore
    .collection('ff-bruneck')
    .doc('JA1pXXbwRSly3DsQ3kni')
    .collection('firestation')
    .doc('7Nokj2Z615087RasEqTC');

  private isMigrating = false;

  constructor(private firestore: AngularFirestore) {
    this.firestationDocument.valueChanges().subscribe((firestation: any) => {
      const storedVehicles = firestation?.availableVehicles || [];

      if (FirestationRoster.isCurrentRoster(storedVehicles)) {
        this.availableVehicles = storedVehicles;
        return;
      }

      this.migrateLegacyRoster(storedVehicles);
    });
  }

  private async migrateLegacyRoster(storedVehicles: string[]): Promise<void> {
    if (this.isMigrating) {
      return;
    }

    this.isMigrating = true;
    try {
      const assignedVehicles = await this.getVehiclesAssignedToActiveOperations();
      this.availableVehicles = FirestationRoster.migrateAvailableVehicles(storedVehicles, assignedVehicles);
      await this.save();
    } finally {
      this.isMigrating = false;
    }
  }

  private async getVehiclesAssignedToActiveOperations(): Promise<string[]> {
    const damagingEvents = await this.firestore
      .collection('ff-bruneck')
      .doc('QEcJgDBlPVt64GUFIPmw')
      .collection('damaging-events')
      .ref
      .get();

    const vehicleLists = await Promise.all(damagingEvents.docs.map(async (damagingEvent: any) => {
      const operations = await damagingEvent.ref.collection('operations').get();
      return operations.docs
        .map((operation: any) => operation.data())
        .filter((operation: any) => operation.status !== 'Abgeschlossen')
        .flatMap((operation: any) => operation.vehicles || []);
    }));

    return vehicleLists.flat();
  }

  public sort() {
    this.availableVehicles.sort((a, b) => a.localeCompare(b));
  }

  public save() {
    return this.firestationDocument.update(this.toJSON());
  }

  public restoreFromFirebase() {
    return this.firestationDocument.ref.get().then((snapshot: any) => {
      this.availableVehicles = snapshot.data()?.availableVehicles || [];
    });
  }

  public toJSON(): any {
    return {
      availableVehicles: this.availableVehicles,
    };
  }
}
