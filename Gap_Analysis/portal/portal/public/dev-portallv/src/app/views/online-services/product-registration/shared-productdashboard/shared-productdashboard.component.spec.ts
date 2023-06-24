import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedProductdashboardComponent } from './shared-productdashboard.component';

describe('SharedProductdashboardComponent', () => {
  let component: SharedProductdashboardComponent;
  let fixture: ComponentFixture<SharedProductdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedProductdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedProductdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
