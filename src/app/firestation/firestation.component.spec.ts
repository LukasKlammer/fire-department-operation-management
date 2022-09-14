import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';

import { FirestationComponent } from './firestation.component';

describe('FirestationComponent', () => {
  let component: FirestationComponent;
  let fixture: ComponentFixture<FirestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule],
      declarations: [FirestationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FirestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
