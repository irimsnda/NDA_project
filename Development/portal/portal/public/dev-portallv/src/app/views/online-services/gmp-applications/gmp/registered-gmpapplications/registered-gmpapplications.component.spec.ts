import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredGmpapplicationsComponent } from './registered-gmpapplications.component';

describe('RegisteredGmpapplicationsComponent', () => {
  let component: RegisteredGmpapplicationsComponent;
  let fixture: ComponentFixture<RegisteredGmpapplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredGmpapplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredGmpapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
