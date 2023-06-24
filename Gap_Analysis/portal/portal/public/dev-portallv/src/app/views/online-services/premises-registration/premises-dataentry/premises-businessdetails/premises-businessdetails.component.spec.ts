import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesBusinessdetailsComponent } from './premises-businessdetails.component';

describe('PremisesBusinessdetailsComponent', () => {
  let component: PremisesBusinessdetailsComponent;
  let fixture: ComponentFixture<PremisesBusinessdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremisesBusinessdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesBusinessdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
