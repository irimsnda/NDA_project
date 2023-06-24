import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalAdvertarchiveComponent } from './promotional-advertarchive.component';

describe('PromotionalAdvertarchiveComponent', () => {
  let component: PromotionalAdvertarchiveComponent;
  let fixture: ComponentFixture<PromotionalAdvertarchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionalAdvertarchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalAdvertarchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
