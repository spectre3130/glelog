import { TestBed } from '@angular/core/testing';
import { MyWritingListResolverService } from './my-writing-list-resolver.service';

describe('MyWritingListResolverService', () => {
  let service: MyWritingListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyWritingListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
