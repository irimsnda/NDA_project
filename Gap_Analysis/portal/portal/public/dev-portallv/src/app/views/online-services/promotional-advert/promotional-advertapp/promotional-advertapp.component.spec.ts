import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalAdvertappComponent } from './promotional-advertapp.component';

describe('PromotionalAdvertappComponent', () => {
  let component: PromotionalAdvertappComponent;
  let fixture: ComponentFixture<PromotionalAdvertappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionalAdvertappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalAdvertappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
