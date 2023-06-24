import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdListingDashboardComponent } from './prod-listing-dashboard.component';

describe('ProdListingDashboardComponent', () => {
  let component: ProdListingDashboardComponent;
  let fixture: ComponentFixture<ProdListingDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdListingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdListingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
