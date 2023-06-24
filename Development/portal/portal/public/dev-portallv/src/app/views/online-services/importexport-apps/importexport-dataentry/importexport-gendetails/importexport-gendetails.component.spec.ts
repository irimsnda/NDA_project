import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportGendetailsComponent } from './importexport-gendetails.component';

describe('ImportexportGendetailsComponent', () => {
  let component: ImportexportGendetailsComponent;
  let fixture: ComponentFixture<ImportexportGendetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportexportGendetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportexportGendetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
