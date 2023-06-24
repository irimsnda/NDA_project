import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedpromotionalAdvertComponent } from './sharedpromotional-advert.component';

describe('SharedpromotionalAdvertComponent', () => {
  let component: SharedpromotionalAdvertComponent;
  let fixture: ComponentFixture<SharedpromotionalAdvertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedpromotionalAdvertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedpromotionalAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
