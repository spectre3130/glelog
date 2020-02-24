import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWritingListComponent } from './my-writing-list.component';

describe('MyWrtingListComponent', () => {
  let component: MyWritingListComponent;
  let fixture: ComponentFixture<MyWritingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWritingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWritingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
