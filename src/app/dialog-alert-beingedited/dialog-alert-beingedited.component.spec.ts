import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlertBeingeditedComponent } from './dialog-alert-beingedited.component';

describe('DialogAlertBeingeditedComponent', () => {
  let component: DialogAlertBeingeditedComponent;
  let fixture: ComponentFixture<DialogAlertBeingeditedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAlertBeingeditedComponent ]
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
