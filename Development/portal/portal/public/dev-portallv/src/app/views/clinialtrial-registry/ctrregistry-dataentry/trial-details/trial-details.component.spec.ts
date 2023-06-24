import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialDetailsComponent } from './trial-details.component';

describe('TrialDetailsComponent', () => {
  let component: TrialDetailsComponent;
  let fixture: ComponentFixture<TrialDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
