import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportDashboardComponent } from './importexport-dashboard.component';

describe('ImportexportDashboardComponent', () => {
  let component: ImportexportDashboardComponent;
  let fixture: ComponentFixture<ImportexportDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportexportDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportexportDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
