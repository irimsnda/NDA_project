import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesChargesComponent } from './fees-charges.component';

describe('FeesChargesComponent', () => {
  let component: FeesChargesComponent;
  let fixture: ComponentFixture<FeesChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
