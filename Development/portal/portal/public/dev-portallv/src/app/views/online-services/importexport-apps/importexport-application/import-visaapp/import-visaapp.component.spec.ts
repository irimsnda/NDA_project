import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportVisaappComponent } from './import-visaapp.component';

describe('ImportVisaappComponent', () => {
  let component: ImportVisaappComponent;
  let fixture: ComponentFixture<ImportVisaappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportVisaappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportVisaappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
