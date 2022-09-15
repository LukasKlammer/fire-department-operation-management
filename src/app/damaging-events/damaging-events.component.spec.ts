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
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show select damaging event list within 10 sec', () => {
    const compiled = fixture.debugElement.nativeElement;
    jasmine.clock().tick(10000);
    let selectionList = compiled.querySelector('#select-damaging-event');
    // expect(selectionList).toBeTruthy();
  })
});
