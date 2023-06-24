import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedControldrugsDashboardComponent } from './shared-controldrugs-dashboard.component';

describe('SharedControldrugsDashboardComponent', () => {
  let component: SharedControldrugsDashboardComponent;
  let fixture: ComponentFixture<SharedControldrugsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedControldrugsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedControldrugsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
