import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderProfileComponent } from './trader-profile.component';

describe('TraderProfileComponent', () => {
  let component: TraderProfileComponent;
  let fixture: ComponentFixture<TraderProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
