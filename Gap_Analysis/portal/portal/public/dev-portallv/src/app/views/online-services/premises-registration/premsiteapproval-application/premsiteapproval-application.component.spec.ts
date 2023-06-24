import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremsiteapprovalApplicationComponent } from './premsiteapproval-application.component';

describe('PremsiteapprovalApplicationComponent', () => {
  let component: PremsiteapprovalApplicationComponent;
  let fixture: ComponentFixture<PremsiteapprovalApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremsiteapprovalApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremsiteapprovalApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
