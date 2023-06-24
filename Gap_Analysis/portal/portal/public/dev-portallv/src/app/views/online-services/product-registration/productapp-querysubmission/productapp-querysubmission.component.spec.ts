import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductappQuerysubmissionComponent } from './productapp-querysubmission.component';

describe('ProductappQuerysubmissionComponent', () => {
  let component: ProductappQuerysubmissionComponent;
  let fixture: ComponentFixture<ProductappQuerysubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductappQuerysubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductappQuerysubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
