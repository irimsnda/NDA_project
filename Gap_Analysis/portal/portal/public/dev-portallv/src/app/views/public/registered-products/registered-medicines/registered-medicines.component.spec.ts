import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredMedicinesComponent } from './registered-medicines.component';

describe('RegisteredMedicinesComponent', () => {
  let component: RegisteredMedicinesComponent;
  let fixture: ComponentFixture<RegisteredMedicinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredMedicinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
