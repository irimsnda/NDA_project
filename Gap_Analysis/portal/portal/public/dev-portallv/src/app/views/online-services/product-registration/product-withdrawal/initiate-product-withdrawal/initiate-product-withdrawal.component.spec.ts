import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateProductWithdrawalComponent } from './initiate-product-withdrawal.component';

describe('InitiateProductWithdrawalComponent', () => {
  let component: InitiateProductWithdrawalComponent;
  let fixture: ComponentFixture<InitiateProductWithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateProductWithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateProductWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
