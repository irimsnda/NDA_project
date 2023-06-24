import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerimportGeneraldetailsComponent } from './perimport-generaldetails.component';

describe('PerimportGeneraldetailsComponent', () => {
  let component: PerimportGeneraldetailsComponent;
  let fixture: ComponentFixture<PerimportGeneraldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerimportGeneraldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerimportGeneraldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
