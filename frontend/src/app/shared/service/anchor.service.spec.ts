import { TestBed } from '@angular/core/testing';

import { AnchorService } from './anchor.service';

describe('AnchorService', () => {
  let service: AnchorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnchorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
