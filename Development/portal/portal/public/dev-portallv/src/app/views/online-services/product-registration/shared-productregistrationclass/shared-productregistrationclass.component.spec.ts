import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedProductregistrationclassComponent } from './shared-productregistrationclass.component';

describe('SharedProductregistrationclassComponent', () => {
  let component: SharedProductregistrationclassComponent;
  let fixture: ComponentFixture<SharedProductregistrationclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedProductregistrationclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedProductregistrationclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
