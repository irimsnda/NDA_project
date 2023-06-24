import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalimportappDashboardComponent } from './personalimportapp-dashboard.component';

describe('PersonalimportappDashboardComponent', () => {
  let component: PersonalimportappDashboardComponent;
  let fixture: ComponentFixture<PersonalimportappDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalimportappDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalimportappDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
