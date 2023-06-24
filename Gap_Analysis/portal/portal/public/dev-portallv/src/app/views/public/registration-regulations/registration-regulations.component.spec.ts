import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRegulationsComponent } from './registration-regulations.component';

describe('RegistrationRegulationsComponent', () => {
  let component: RegistrationRegulationsComponent;
  let fixture: ComponentFixture<RegistrationRegulationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationRegulationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRegulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
