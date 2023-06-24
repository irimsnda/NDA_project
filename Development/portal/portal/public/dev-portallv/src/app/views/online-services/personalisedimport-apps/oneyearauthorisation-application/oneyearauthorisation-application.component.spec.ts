import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneyearauthorisationApplicationComponent } from './oneyearauthorisation-application.component';

describe('OneyearauthorisationApplicationComponent', () => {
  let component: OneyearauthorisationApplicationComponent;
  let fixture: ComponentFixture<OneyearauthorisationApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneyearauthorisationApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneyearauthorisationApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
