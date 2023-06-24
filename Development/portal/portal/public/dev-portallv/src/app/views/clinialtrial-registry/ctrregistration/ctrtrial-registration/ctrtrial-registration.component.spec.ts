import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrtrialRegistrationComponent } from './ctrtrial-registration.component';

describe('CtrtrialRegistrationComponent', () => {
  let component: CtrtrialRegistrationComponent;
  let fixture: ComponentFixture<CtrtrialRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtrtrialRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrtrialRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
