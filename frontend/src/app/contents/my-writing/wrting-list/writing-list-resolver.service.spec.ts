import { TestBed } from '@angular/core/testing';

import { WritingListResolverService } from './writing-list-resolver.service';

describe('WritingListResolverService', () => {
  let service: WritingListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WritingListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
