import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedpromotionalAdvertsComponent } from './approvedpromotional-adverts.component';

describe('ApprovedpromotionalAdvertsComponent', () => {
  let component: ApprovedpromotionalAdvertsComponent;
  let fixture: ComponentFixture<ApprovedpromotionalAdvertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedpromotionalAdvertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedpromotionalAdvertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
