import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedpublicShareclassComponent } from './sharedpublic-shareclass.component';

describe('SharedpublicShareclassComponent', () => {
  let component: SharedpublicShareclassComponent;
  let fixture: ComponentFixture<SharedpublicShareclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedpublicShareclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedpublicShareclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
