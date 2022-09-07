import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDamagingEventComponent } from './dialog-add-damaging-event.component';

describe('DialogAddDamagingEventComponent', () => {
  let component: DialogAddDamagingEventComponent;
  let fixture: ComponentFixture<DialogAddDamagingEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddDamagingEventComponent ]
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
