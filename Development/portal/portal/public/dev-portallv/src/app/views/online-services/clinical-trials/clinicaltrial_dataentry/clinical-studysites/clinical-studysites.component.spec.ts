import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalStudysitesComponent } from './clinical-studysites.component';

describe('ClinicalStudysitesComponent', () => {
  let component: ClinicalStudysitesComponent;
  let fixture: ComponentFixture<ClinicalStudysitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalStudysitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalStudysitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
