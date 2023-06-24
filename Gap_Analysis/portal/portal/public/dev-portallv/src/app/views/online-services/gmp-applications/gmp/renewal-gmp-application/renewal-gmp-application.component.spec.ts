import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalGmpApplicationComponent } from './renewal-gmp-application.component';

describe('RenewalGmpApplicationComponent', () => {
  let component: RenewalGmpApplicationComponent;
  let fixture: ComponentFixture<RenewalGmpApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalGmpApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalGmpApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
