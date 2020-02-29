import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmButtonComponent } from './alarm-button.component';

describe('AlarmButtonComponent', () => {
  let component: AlarmButtonComponent;
  let fixture: ComponentFixture<AlarmButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
