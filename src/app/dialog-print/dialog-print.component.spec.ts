import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { DialogPrintComponent } from './dialog-print.component';

describe('DialogPrintComponent', () => {
  let component: DialogPrintComponent;
  let fixture: ComponentFixture<DialogPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPrintComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
