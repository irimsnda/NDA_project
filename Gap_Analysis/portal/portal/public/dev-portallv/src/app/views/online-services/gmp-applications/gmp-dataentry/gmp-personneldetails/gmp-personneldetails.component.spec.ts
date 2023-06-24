import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpPersonneldetailsComponent } from './gmp-personneldetails.component';

describe('GmpPersonneldetailsComponent', () => {
  let component: GmpPersonneldetailsComponent;
  let fixture: ComponentFixture<GmpPersonneldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpPersonneldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpPersonneldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
