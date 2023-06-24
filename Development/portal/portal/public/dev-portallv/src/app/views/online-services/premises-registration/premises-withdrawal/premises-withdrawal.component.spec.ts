import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesWithdrawalComponent } from './premises-withdrawal.component';

describe('PremisesWithdrawalComponent', () => {
  let component: PremisesWithdrawalComponent;
  let fixture: ComponentFixture<PremisesWithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremisesWithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
