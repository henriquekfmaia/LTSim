import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorCanvasComponent } from './simulator-canvas.component';

describe('SimulatorCanvasComponent', () => {
  let component: SimulatorCanvasComponent;
  let fixture: ComponentFixture<SimulatorCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
