import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalInvestigatorsComponent } from './clinical-investigators.component';

describe('ClinicalInvestigatorsComponent', () => {
  let component: ClinicalInvestigatorsComponent;
  let fixture: ComponentFixture<ClinicalInvestigatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalInvestigatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalInvestigatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
