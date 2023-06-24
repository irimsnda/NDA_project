import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedGmpapplicationclassComponent } from './shared-gmpapplicationclass.component';

describe('SharedGmpapplicationclassComponent', () => {
  let component: SharedGmpapplicationclassComponent;
  let fixture: ComponentFixture<SharedGmpapplicationclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedGmpapplicationclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedGmpapplicationclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
