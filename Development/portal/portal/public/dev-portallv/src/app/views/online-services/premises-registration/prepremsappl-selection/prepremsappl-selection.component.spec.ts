import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepremsapplSelectionComponent } from './prepremsappl-selection.component';

describe('PrepremsapplSelectionComponent', () => {
  let component: PrepremsapplSelectionComponent;
  let fixture: ComponentFixture<PrepremsapplSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepremsapplSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepremsapplSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
