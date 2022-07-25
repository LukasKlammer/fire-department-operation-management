import { TestBed } from '@angular/core/testing';

import { UserSelectionsService } from './user-selections.service';

describe('UserSelectionsService', () => {
  let service: UserSelectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSelectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
