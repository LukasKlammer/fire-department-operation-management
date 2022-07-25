import { TestBed } from '@angular/core/testing';

import { FirestationService } from './firestation.service';

describe('FirestationService', () => {
  let service: FirestationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
