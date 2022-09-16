import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeStationComponent } from './gauge-station.component';

describe('GaugeStationComponent', () => {
  let component: GaugeStationComponent;
  let fixture: ComponentFixture<GaugeStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaugeStationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaugeStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
