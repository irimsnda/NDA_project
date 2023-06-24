import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateNewproductApplicationComponent } from './initiate-newproduct-application.component';

describe('InitiateNewproductApplicationComponent', () => {
  let component: InitiateNewproductApplicationComponent;
  let fixture: ComponentFixture<InitiateNewproductApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateNewproductApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateNewproductApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
