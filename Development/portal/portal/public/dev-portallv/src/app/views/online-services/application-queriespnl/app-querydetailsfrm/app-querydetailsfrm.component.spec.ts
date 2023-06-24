import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppQuerydetailsfrmComponent } from './app-querydetailsfrm.component';

describe('AppQuerydetailsfrmComponent', () => {
  let component: AppQuerydetailsfrmComponent;
  let fixture: ComponentFixture<AppQuerydetailsfrmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppQuerydetailsfrmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppQuerydetailsfrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
