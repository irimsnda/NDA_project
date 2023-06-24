import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesGeneraldetailsComponent } from './premises-generaldetails.component';

describe('PremisesGeneraldetailsComponent', () => {
  let component: PremisesGeneraldetailsComponent;
  let fixture: ComponentFixture<PremisesGeneraldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremisesGeneraldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesGeneraldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
