import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthicsApprovalComponent } from './ethics-approval.component';

describe('EthicsApprovalComponent', () => {
  let component: EthicsApprovalComponent;
  let fixture: ComponentFixture<EthicsApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthicsApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthicsApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
