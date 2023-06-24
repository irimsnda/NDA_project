import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedImportexportComponent } from './approved-importexport.component';

describe('ApprovedImportexportComponent', () => {
  let component: ApprovedImportexportComponent;
  let fixture: ComponentFixture<ApprovedImportexportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedImportexportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedImportexportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
