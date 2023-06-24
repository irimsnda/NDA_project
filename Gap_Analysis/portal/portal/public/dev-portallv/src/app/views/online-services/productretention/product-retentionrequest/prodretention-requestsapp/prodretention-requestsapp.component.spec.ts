import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdretentionRequestsappComponent } from './prodretention-requestsapp.component';

describe('ProdretentionRequestsappComponent', () => {
  let component: ProdretentionRequestsappComponent;
  let fixture: ComponentFixture<ProdretentionRequestsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdretentionRequestsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdretentionRequestsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
