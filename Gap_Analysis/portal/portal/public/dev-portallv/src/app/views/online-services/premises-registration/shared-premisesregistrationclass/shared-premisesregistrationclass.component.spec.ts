import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPremisesregistrationclassComponent } from './shared-premisesregistrationclass.component';

describe('SharedPremisesregistrationclassComponent', () => {
  let component: SharedPremisesregistrationclassComponent;
  let fixture: ComponentFixture<SharedPremisesregistrationclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedPremisesregistrationclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedPremisesregistrationclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
