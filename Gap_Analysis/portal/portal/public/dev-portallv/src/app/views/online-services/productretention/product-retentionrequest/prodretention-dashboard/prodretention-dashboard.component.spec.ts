import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdretentionDashboardComponent } from './prodretention-dashboard.component';

describe('ProdretentionDashboardComponent', () => {
  let component: ProdretentionDashboardComponent;
  let fixture: ComponentFixture<ProdretentionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdretentionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdretentionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
