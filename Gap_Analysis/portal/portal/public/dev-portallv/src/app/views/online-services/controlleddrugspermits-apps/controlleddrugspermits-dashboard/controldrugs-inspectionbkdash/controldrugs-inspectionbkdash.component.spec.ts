import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControldrugsInspectionbkdashComponent } from './controldrugs-inspectionbkdash.component';

describe('ControldrugsInspectionbkdashComponent', () => {
  let component: ControldrugsInspectionbkdashComponent;
  let fixture: ComponentFixture<ControldrugsInspectionbkdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControldrugsInspectionbkdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControldrugsInspectionbkdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
