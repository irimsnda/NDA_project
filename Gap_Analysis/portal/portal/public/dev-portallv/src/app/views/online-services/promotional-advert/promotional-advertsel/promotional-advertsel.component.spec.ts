import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalAdvertselComponent } from './promotional-advertsel.component';

describe('PromotionalAdvertselComponent', () => {
  let component: PromotionalAdvertselComponent;
  let fixture: ComponentFixture<PromotionalAdvertselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionalAdvertselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalAdvertselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
