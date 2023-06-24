import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinspectionApplicationComponent } from './preinspection-application.component';

describe('PreinspectionApplicationComponent', () => {
  let component: PreinspectionApplicationComponent;
  let fixture: ComponentFixture<PreinspectionApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreinspectionApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreinspectionApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
