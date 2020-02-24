import { TestBed } from '@angular/core/testing';

import { UserHomeResolverService } from './user-home-resolver.service';

describe('UserHomeResolverService', () => {
  let service: UserHomeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHomeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
