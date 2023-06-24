import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationProcessguidelinesComponent } from './application-processguidelines.component';

describe('ApplicationProcessguidelinesComponent', () => {
  let component: ApplicationProcessguidelinesComponent;
  let fixture: ComponentFixture<ApplicationProcessguidelinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationProcessguidelinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationProcessguidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
