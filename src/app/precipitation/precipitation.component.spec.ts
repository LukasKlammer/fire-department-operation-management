import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecipitationComponent } from './precipitation.component';

describe('PrecipitationComponent', () => {
  let component: PrecipitationComponent;
  let fixture: ComponentFixture<PrecipitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecipitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecipitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links to the current official precipitation radar page', () => {
    expect(component.officialRadarUrl).toBe('https://wetter.provinz.bz.it/de/radar-blitze-und-satellit');
  });
});
