import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnalisedimportDashboardComponent } from './personnalisedimport-dashboard.component';

describe('PersonnalisedimportDashboardComponent', () => {
  let component: PersonnalisedimportDashboardComponent;
  let fixture: ComponentFixture<PersonnalisedimportDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnalisedimportDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnalisedimportDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
