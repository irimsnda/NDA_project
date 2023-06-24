import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpApplicationsSelectionComponent } from './gmp-applications-selection.component';

describe('GmpApplicationsSelectionComponent', () => {
  let component: GmpApplicationsSelectionComponent;
  let fixture: ComponentFixture<GmpApplicationsSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpApplicationsSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpApplicationsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
