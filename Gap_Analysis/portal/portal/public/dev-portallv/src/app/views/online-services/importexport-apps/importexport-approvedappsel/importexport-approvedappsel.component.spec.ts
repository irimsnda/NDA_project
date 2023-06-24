import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportApprovedappselComponent } from './importexport-approvedappsel.component';

describe('ImportexportApprovedappselComponent', () => {
  let component: ImportexportApprovedappselComponent;
  let fixture: ComponentFixture<ImportexportApprovedappselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportexportApprovedappselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportexportApprovedappselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
