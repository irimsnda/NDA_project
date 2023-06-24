import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesinspectionFeesComponent } from './premisesinspection-fees.component';

describe('PremisesinspectionFeesComponent', () => {
  let component: PremisesinspectionFeesComponent;
  let fixture: ComponentFixture<PremisesinspectionFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremisesinspectionFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesinspectionFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
