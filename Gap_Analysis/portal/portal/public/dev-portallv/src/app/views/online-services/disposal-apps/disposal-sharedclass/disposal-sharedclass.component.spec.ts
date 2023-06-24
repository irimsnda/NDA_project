import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalSharedclassComponent } from './disposal-sharedclass.component';

describe('DisposalSharedclassComponent', () => {
  let component: DisposalSharedclassComponent;
  let fixture: ComponentFixture<DisposalSharedclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisposalSharedclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalSharedclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
