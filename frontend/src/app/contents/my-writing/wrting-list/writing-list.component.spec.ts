import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingListComponent } from './writing-list.component';

describe('WrtingListComponent', () => {
  let component: WritingListComponent;
  let fixture: ComponentFixture<WritingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
