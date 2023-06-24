import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredManufacturingpremisesComponent } from './registered-manufacturingpremises.component';

describe('RegisteredManufacturingpremisesComponent', () => {
  let component: RegisteredManufacturingpremisesComponent;
  let fixture: ComponentFixture<RegisteredManufacturingpremisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredManufacturingpremisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredManufacturingpremisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
