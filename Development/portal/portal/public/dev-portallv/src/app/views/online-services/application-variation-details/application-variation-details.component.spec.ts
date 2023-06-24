import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationVariationDetailsComponent } from './application-variation-details.component';

describe('ApplicationVariationDetailsComponent', () => {
  let component: ApplicationVariationDetailsComponent;
  let fixture: ComponentFixture<ApplicationVariationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationVariationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationVariationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
