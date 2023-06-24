import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpremisesDashboardComponent } from './newpremises-dashboard.component';

describe('NewpremisesDashboardComponent', () => {
  let component: NewpremisesDashboardComponent;
  let fixture: ComponentFixture<NewpremisesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpremisesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpremisesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
