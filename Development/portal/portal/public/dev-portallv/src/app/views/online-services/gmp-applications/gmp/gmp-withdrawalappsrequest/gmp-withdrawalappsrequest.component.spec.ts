import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpWithdrawalappsrequestComponent } from './gmp-withdrawalappsrequest.component';

describe('GmpWithdrawalappsrequestComponent', () => {
  let component: GmpWithdrawalappsrequestComponent;
  let fixture: ComponentFixture<GmpWithdrawalappsrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpWithdrawalappsrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpWithdrawalappsrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
