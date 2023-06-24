import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPremisesComponent } from './food-premises.component';

describe('FoodPremisesComponent', () => {
  let component: FoodPremisesComponent;
  let fixture: ComponentFixture<FoodPremisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodPremisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodPremisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
