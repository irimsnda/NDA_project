import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialFeesComponent } from './clinicaltrial-fees.component';

describe('ClinicaltrialFeesComponent', () => {
  let component: ClinicaltrialFeesComponent;
  let fixture: ComponentFixture<ClinicaltrialFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaltrialFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltrialFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
