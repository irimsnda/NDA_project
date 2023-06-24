import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewexhibitionTradefairdashComponent } from './newexhibition-tradefairdash.component';

describe('NewexhibitionTradefairdashComponent', () => {
  let component: NewexhibitionTradefairdashComponent;
  let fixture: ComponentFixture<NewexhibitionTradefairdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewexhibitionTradefairdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewexhibitionTradefairdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
