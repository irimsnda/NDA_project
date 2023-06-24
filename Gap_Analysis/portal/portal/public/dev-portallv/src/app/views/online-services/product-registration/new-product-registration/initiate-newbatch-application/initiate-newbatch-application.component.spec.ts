import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateNewbatchApplicationComponent } from './initiate-newbatch-application.component';

describe('InitiateNewbatchApplicationComponent', () => {
  let component: InitiateNewbatchApplicationComponent;
  let fixture: ComponentFixture<InitiateNewbatchApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateNewbatchApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateNewbatchApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
