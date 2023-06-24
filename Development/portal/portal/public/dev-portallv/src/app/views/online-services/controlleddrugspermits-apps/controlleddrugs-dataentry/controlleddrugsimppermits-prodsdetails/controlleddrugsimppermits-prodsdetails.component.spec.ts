import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlleddrugsimppermitsProdsdetailsComponent } from './controlleddrugsimppermits-prodsdetails.component';

describe('ControlleddrugsimppermitsProdsdetailsComponent', () => {
  let component: ControlleddrugsimppermitsProdsdetailsComponent;
  let fixture: ComponentFixture<ControlleddrugsimppermitsProdsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlleddrugsimppermitsProdsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlleddrugsimppermitsProdsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
