import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionSharedclassComponent } from './retention-sharedclass.component';

describe('RetentionSharedclassComponent', () => {
  let component: RetentionSharedclassComponent;
  let fixture: ComponentFixture<RetentionSharedclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetentionSharedclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetentionSharedclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
