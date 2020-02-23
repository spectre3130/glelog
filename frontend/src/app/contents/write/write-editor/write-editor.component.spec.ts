import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteEditorComponent } from './write-editor.component';

describe('WriteEditorComponent', () => {
  let component: WriteEditorComponent;
  let fixture: ComponentFixture<WriteEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
