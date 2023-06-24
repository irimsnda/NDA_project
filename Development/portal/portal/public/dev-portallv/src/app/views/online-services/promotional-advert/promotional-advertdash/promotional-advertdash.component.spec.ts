import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalAdvertdashComponent } from './promotional-advertdash.component';

describe('PromotionalAdvertdashComponent', () => {
  let component: PromotionalAdvertdashComponent;
  let fixture: ComponentFixture<PromotionalAdvertdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionalAdvertdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalAdvertdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
