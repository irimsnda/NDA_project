import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrregistryLayoutComponent } from './ctrregistry-layout.component';

describe('CtrregistryLayoutComponent', () => {
  let component: CtrregistryLayoutComponent;
  let fixture: ComponentFixture<CtrregistryLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtrregistryLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrregistryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
