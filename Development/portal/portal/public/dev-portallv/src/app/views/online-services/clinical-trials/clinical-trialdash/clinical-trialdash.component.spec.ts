import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalTrialdashComponent } from './clinical-trialdash.component';

describe('ClinicalTrialdashComponent', () => {
  let component: ClinicalTrialdashComponent;
  let fixture: ComponentFixture<ClinicalTrialdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalTrialdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalTrialdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
