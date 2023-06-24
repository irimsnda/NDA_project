import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceApppreviewComponent } from './invoice-apppreview.component';

describe('InvoiceApppreviewComponent', () => {
  let component: InvoiceApppreviewComponent;
  let fixture: ComponentFixture<InvoiceApppreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceApppreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceApppreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
