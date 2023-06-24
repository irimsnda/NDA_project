import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltriaregDocumentsComponent } from './clinicaltriareg-documents.component';

describe('ClinicaltriaregDocumentsComponent', () => {
  let component: ClinicaltriaregDocumentsComponent;
  let fixture: ComponentFixture<ClinicaltriaregDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicaltriaregDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltriaregDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
