import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredGmpselectionComponent } from './registered-gmpselection.component';

describe('RegisteredGmpselectionComponent', () => {
  let component: RegisteredGmpselectionComponent;
  let fixture: ComponentFixture<RegisteredGmpselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredGmpselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredGmpselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
