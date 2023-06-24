import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportSelComponent } from './importexport-sel.component';

describe('ImportexportSelComponent', () => {
  let component: ImportexportSelComponent;
  let fixture: ComponentFixture<ImportexportSelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportexportSelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportexportSelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
