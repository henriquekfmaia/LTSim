import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorInterfaceComponent } from './simulator-interface.component';

describe('SimulatorInterfaceComponent', () => {
  let component: SimulatorInterfaceComponent;
  let fixture: ComponentFixture<SimulatorInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
