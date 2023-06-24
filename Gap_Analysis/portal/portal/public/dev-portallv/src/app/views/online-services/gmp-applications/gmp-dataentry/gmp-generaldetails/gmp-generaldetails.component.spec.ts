import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpGeneraldetailsComponent } from './gmp-generaldetails.component';

describe('GmpGeneraldetailsComponent', () => {
  let component: GmpGeneraldetailsComponent;
  let fixture: ComponentFixture<GmpGeneraldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpGeneraldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpGeneraldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
