import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalPermitrequestsComponent } from './disposal-permitrequests.component';

describe('DisposalPermitrequestsComponent', () => {
  let component: DisposalPermitrequestsComponent;
  let fixture: ComponentFixture<DisposalPermitrequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisposalPermitrequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalPermitrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
