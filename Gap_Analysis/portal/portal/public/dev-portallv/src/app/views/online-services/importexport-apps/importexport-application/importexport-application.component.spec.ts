import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportApplicationComponent } from './importexport-application.component';

describe('ImportexportApplicationComponent', () => {
  let component: ImportexportApplicationComponent;
  let fixture: ComponentFixture<ImportexportApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportexportApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportexportApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
