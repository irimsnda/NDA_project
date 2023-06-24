import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredPremisesComponent } from './registered-premises.component';

describe('RegisteredPremisesComponent', () => {
  let component: RegisteredPremisesComponent;
  let fixture: ComponentFixture<RegisteredPremisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredPremisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredPremisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
