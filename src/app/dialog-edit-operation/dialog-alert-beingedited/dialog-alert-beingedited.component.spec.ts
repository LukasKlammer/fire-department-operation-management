import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { DialogAlertBeingeditedComponent } from './dialog-alert-beingedited.component';

describe('DialogAlertBeingeditedComponent', () => {
  let component: DialogAlertBeingeditedComponent;
  let fixture: ComponentFixture<DialogAlertBeingeditedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAlertBeingeditedComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAlertBeingeditedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
