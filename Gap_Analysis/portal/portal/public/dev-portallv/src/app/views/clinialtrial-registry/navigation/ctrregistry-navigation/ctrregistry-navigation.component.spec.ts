import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrregistryNavigationComponent } from './ctrregistry-navigation.component';

describe('CtrregistryNavigationComponent', () => {
  let component: CtrregistryNavigationComponent;
  let fixture: ComponentFixture<CtrregistryNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtrregistryNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrregistryNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
