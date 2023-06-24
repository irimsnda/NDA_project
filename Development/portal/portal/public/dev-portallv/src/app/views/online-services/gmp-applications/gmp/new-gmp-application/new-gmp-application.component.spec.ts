import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGmpApplicationComponent } from './new-gmp-application.component';

describe('NewGmpApplicationComponent', () => {
  let component: NewGmpApplicationComponent;
  let fixture: ComponentFixture<NewGmpApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGmpApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGmpApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
