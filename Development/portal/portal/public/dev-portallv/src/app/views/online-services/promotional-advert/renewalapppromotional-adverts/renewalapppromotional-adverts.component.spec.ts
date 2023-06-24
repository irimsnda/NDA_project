import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalapppromotionalAdvertsComponent } from './renewalapppromotional-adverts.component';

describe('RenewalapppromotionalAdvertsComponent', () => {
  let component: RenewalapppromotionalAdvertsComponent;
  let fixture: ComponentFixture<RenewalapppromotionalAdvertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalapppromotionalAdvertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalapppromotionalAdvertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
