import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugshopNearestlocationComponent } from './drugshop-nearestlocation.component';

describe('DrugshopNearestlocationComponent', () => {
  let component: DrugshopNearestlocationComponent;
  let fixture: ComponentFixture<DrugshopNearestlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugshopNearestlocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugshopNearestlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
