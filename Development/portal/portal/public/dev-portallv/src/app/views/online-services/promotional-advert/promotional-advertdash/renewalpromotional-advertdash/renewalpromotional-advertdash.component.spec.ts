import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalpromotionalAdvertdashComponent } from './renewalpromotional-advertdash.component';

describe('RenewalpromotionalAdvertdashComponent', () => {
  let component: RenewalpromotionalAdvertdashComponent;
  let fixture: ComponentFixture<RenewalpromotionalAdvertdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalpromotionalAdvertdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalpromotionalAdvertdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
