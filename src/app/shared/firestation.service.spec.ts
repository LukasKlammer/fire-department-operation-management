import { TestBed } from '@angular/core/testing';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';

import { FirestationService } from './firestation.service';

describe('FirestationService', () => {
  let service: FirestationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule],
    })

    service = TestBed.inject(FirestationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
