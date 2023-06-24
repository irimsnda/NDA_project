import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportlicenseDashboardComponent } from './importlicense-dashboard.component';

describe('ImportlicenseDashboardComponent', () => {
  let component: ImportlicenseDashboardComponent;
  let fixture: ComponentFixture<ImportlicenseDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportlicenseDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportlicenseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
