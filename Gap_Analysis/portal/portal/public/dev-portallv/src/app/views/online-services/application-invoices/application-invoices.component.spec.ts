import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationInvoicesComponent } from './application-invoices.component';

describe('ApplicationInvoicesComponent', () => {
  let component: ApplicationInvoicesComponent;
  let fixture: ComponentFixture<ApplicationInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
