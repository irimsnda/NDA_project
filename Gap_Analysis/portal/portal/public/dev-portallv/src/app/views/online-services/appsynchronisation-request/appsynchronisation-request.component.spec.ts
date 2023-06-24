import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsynchronisationRequestComponent } from './appsynchronisation-request.component';

describe('AppsynchronisationRequestComponent', () => {
  let component: AppsynchronisationRequestComponent;
  let fixture: ComponentFixture<AppsynchronisationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsynchronisationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsynchronisationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
