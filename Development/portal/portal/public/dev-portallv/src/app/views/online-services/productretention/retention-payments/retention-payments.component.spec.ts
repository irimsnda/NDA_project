import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionPaymentsComponent } from './retention-payments.component';

describe('RetentionPaymentsComponent', () => {
  let component: RetentionPaymentsComponent;
  let fixture: ComponentFixture<RetentionPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetentionPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetentionPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
