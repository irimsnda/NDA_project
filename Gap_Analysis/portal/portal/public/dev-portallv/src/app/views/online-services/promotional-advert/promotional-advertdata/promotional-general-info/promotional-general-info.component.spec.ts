import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalGeneralInfoComponent } from './promotional-general-info.component';

describe('PromotionalGeneralInfoComponent', () => {
  let component: PromotionalGeneralInfoComponent;
  let fixture: ComponentFixture<PromotionalGeneralInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionalGeneralInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
