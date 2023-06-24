import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedpersonalisedimpApplicationComponent } from './sharedpersonalisedimp-application.component';

describe('SharedpersonalisedimpApplicationComponent', () => {
  let component: SharedpersonalisedimpApplicationComponent;
  let fixture: ComponentFixture<SharedpersonalisedimpApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedpersonalisedimpApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedpersonalisedimpApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
