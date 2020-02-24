import { TestBed } from '@angular/core/testing';

import { PostResolverService } from './post-resolver.service';

describe('PostResolverService', () => {
  let service: PostResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
