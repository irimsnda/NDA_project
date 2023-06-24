import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportFeesComponent } from './importexport-fees.component';

describe('ImportexportFeesComponent', () => {
  let component: ImportexportFeesComponent;
  let fixture: ComponentFixture<ImportexportFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportexportFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportexportFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
