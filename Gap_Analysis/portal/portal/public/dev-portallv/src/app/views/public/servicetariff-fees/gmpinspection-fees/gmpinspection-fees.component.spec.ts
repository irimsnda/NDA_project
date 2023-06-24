import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpinspectionFeesComponent } from './gmpinspection-fees.component';

describe('GmpinspectionFeesComponent', () => {
  let component: GmpinspectionFeesComponent;
  let fixture: ComponentFixture<GmpinspectionFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpinspectionFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpinspectionFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
