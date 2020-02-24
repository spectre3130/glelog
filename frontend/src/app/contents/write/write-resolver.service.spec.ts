import { TestBed } from '@angular/core/testing';

import { WriteResolverService } from './write-resolver.service';

describe('WriteResolverService', () => {
  let service: WriteResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WriteResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
