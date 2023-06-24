import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisedHumanmedicinesComponent } from './authorised-humanmedicines.component';

describe('AuthorisedHumanmedicinesComponent', () => {
  let component: AuthorisedHumanmedicinesComponent;
  let fixture: ComponentFixture<AuthorisedHumanmedicinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorisedHumanmedicinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorisedHumanmedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
