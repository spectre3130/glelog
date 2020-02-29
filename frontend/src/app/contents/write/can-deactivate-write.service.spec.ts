import { TestBed } from '@angular/core/testing';

import { CanDeactivateWriteService } from './can-deactivate-write.service';

describe('CanDeactivateWriteService', () => {
  let service: CanDeactivateWriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanDeactivateWriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
