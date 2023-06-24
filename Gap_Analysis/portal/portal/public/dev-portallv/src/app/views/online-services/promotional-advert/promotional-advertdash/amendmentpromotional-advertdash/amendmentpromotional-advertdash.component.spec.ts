import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmendmentpromotionalAdvertdashComponent } from './amendmentpromotional-advertdash.component';

describe('AmendmentpromotionalAdvertdashComponent', () => {
  let component: AmendmentpromotionalAdvertdashComponent;
  let fixture: ComponentFixture<AmendmentpromotionalAdvertdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmendmentpromotionalAdvertdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmendmentpromotionalAdvertdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
