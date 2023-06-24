import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlleddrugsimppermitsGendetailsComponent } from './controlleddrugsimppermits-gendetails.component';

describe('ControlleddrugsimppermitsGendetailsComponent', () => {
  let component: ControlleddrugsimppermitsGendetailsComponent;
  let fixture: ComponentFixture<ControlleddrugsimppermitsGendetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlleddrugsimppermitsGendetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlleddrugsimppermitsGendetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
