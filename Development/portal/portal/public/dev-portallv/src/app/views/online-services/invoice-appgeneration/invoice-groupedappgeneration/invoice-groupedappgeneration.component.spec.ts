import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceGroupedappgenerationComponent } from './invoice-groupedappgeneration.component';

describe('InvoiceGroupedappgenerationComponent', () => {
  let component: InvoiceGroupedappgenerationComponent;
  let fixture: ComponentFixture<InvoiceGroupedappgenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceGroupedappgenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceGroupedappgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
