import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewclinicaltrialDashboardComponent } from './newclinicaltrial-dashboard.component';

describe('NewclinicaltrialDashboardComponent', () => {
  let component: NewclinicaltrialDashboardComponent;
  let fixture: ComponentFixture<NewclinicaltrialDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewclinicaltrialDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewclinicaltrialDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
