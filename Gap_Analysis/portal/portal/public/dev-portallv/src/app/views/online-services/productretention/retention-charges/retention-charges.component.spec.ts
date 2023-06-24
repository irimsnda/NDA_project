import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionChargesComponent } from './retention-charges.component';

describe('RetentionChargesComponent', () => {
  let component: RetentionChargesComponent;
  let fixture: ComponentFixture<RetentionChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetentionChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetentionChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
