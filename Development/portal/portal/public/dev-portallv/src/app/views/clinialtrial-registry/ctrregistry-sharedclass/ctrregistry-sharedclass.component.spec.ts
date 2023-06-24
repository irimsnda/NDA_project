import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrregistrySharedclassComponent } from './ctrregistry-sharedclass.component';

describe('CtrregistrySharedclassComponent', () => {
  let component: CtrregistrySharedclassComponent;
  let fixture: ComponentFixture<CtrregistrySharedclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtrregistrySharedclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrregistrySharedclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
