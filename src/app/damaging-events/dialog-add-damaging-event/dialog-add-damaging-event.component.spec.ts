import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';

import { DialogAddDamagingEventComponent } from './dialog-add-damaging-event.component';
import { FormsModule } from '@angular/forms';

describe('DialogAddDamagingEventComponent', () => {
  let component: DialogAddDamagingEventComponent;
  let fixture: ComponentFixture<DialogAddDamagingEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule, FormsModule],
      declarations: [ DialogAddDamagingEventComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddDamagingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
