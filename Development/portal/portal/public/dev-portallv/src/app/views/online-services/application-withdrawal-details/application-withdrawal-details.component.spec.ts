import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationWithdrawalDetailsComponent } from './application-withdrawal-details.component';

describe('ApplicationWithdrawalDetailsComponent', () => {
  let component: ApplicationWithdrawalDetailsComponent;
  let fixture: ComponentFixture<ApplicationWithdrawalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationWithdrawalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationWithdrawalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
