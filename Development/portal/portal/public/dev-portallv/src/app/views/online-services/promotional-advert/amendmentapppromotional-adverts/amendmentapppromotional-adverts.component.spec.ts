import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmendmentapppromotionalAdvertsComponent } from './amendmentapppromotional-adverts.component';

describe('AmendmentapppromotionalAdvertsComponent', () => {
  let component: AmendmentapppromotionalAdvertsComponent;
  let fixture: ComponentFixture<AmendmentapppromotionalAdvertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmendmentapppromotionalAdvertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmendmentapppromotionalAdvertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
