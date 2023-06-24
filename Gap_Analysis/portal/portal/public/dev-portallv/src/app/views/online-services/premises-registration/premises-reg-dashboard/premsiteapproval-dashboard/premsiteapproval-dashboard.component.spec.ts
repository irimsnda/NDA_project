import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremsiteapprovalDashboardComponent } from './premsiteapproval-dashboard.component';

describe('PremsiteapprovalDashboardComponent', () => {
  let component: PremsiteapprovalDashboardComponent;
  let fixture: ComponentFixture<PremsiteapprovalDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremsiteapprovalDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremsiteapprovalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
