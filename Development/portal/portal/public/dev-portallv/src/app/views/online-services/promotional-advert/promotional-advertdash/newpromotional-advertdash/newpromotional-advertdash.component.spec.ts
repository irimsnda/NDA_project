import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpromotionalAdvertdashComponent } from './newpromotional-advertdash.component';

describe('NewpromotionalAdvertdashComponent', () => {
  let component: NewpromotionalAdvertdashComponent;
  let fixture: ComponentFixture<NewpromotionalAdvertdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpromotionalAdvertdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpromotionalAdvertdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
