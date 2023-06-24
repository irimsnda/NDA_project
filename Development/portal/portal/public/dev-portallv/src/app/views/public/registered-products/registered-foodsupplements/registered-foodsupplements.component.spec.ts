import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredFoodsupplementsComponent } from './registered-foodsupplements.component';

describe('RegisteredFoodsupplementsComponent', () => {
  let component: RegisteredFoodsupplementsComponent;
  let fixture: ComponentFixture<RegisteredFoodsupplementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredFoodsupplementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredFoodsupplementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
