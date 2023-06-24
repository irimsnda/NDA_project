import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDrugshopsregistrationclassComponent } from './shared-drugshopsregistrationclass.component';

describe('SharedDrugshopsregistrationclassComponent', () => {
  let component: SharedDrugshopsregistrationclassComponent;
  let fixture: ComponentFixture<SharedDrugshopsregistrationclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedDrugshopsregistrationclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDrugshopsregistrationclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
