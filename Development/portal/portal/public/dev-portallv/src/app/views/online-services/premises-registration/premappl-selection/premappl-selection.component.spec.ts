import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremapplSelectionComponent } from './premappl-selection.component';

describe('PremapplSelectionComponent', () => {
  let component: PremapplSelectionComponent;
  let fixture: ComponentFixture<PremapplSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremapplSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremapplSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
