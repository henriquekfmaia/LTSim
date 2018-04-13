import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultEditorComponent } from './result-editor.component';

describe('ResultEditorComponent', () => {
  let component: ResultEditorComponent;
  let fixture: ComponentFixture<ResultEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
