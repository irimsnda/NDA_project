import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAppgenerationComponent } from './invoice-appgeneration.component';

describe('InvoiceAppgenerationComponent', () => {
  let component: InvoiceAppgenerationComponent;
  let fixture: ComponentFixture<InvoiceAppgenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceAppgenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceAppgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
