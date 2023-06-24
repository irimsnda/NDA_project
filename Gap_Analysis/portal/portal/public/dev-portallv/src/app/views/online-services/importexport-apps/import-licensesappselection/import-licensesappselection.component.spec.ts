import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLicensesappselectionComponent } from './import-licensesappselection.component';

describe('ImportLicensesappselectionComponent', () => {
  let component: ImportLicensesappselectionComponent;
  let fixture: ComponentFixture<ImportLicensesappselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportLicensesappselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLicensesappselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
