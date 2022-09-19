import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeStationsComponent } from './gauge-stations.component';

describe('GaugeStationsComponent', () => {
  let component: GaugeStationsComponent;
  let fixture: ComponentFixture<GaugeStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaugeStationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaugeStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
