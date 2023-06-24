import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpBusinessdetailsComponent } from './gmp-businessdetails.component';

describe('GmpBusinessdetailsComponent', () => {
  let component: GmpBusinessdetailsComponent;
  let fixture: ComponentFixture<GmpBusinessdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpBusinessdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpBusinessdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
