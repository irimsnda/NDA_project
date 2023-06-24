import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationPaymentsComponent } from './application-payments.component';

describe('ApplicationPaymentsComponent', () => {
  let component: ApplicationPaymentsComponent;
  let fixture: ComponentFixture<ApplicationPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
