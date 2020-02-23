import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritePreviewComponent } from './write-preview.component';

describe('WritePreviewComponent', () => {
  let component: WritePreviewComponent;
  let fixture: ComponentFixture<WritePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
