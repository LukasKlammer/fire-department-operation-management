import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';

import { DamagingEventsComponent } from './damaging-events.component';

describe('DamagingEventsComponent', () => {
  let component: DamagingEventsComponent;
  let fixture: ComponentFixture<DamagingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule, MatDialogModule],


      declarations: [ DamagingEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamagingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
