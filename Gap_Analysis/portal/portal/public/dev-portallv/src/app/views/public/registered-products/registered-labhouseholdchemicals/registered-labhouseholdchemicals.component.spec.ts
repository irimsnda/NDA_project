import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredLabhouseholdchemicalsComponent } from './registered-labhouseholdchemicals.component';

describe('RegisteredLabhouseholdchemicalsComponent', () => {
  let component: RegisteredLabhouseholdchemicalsComponent;
  let fixture: ComponentFixture<RegisteredLabhouseholdchemicalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredLabhouseholdchemicalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredLabhouseholdchemicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
