import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrregistryFooterComponent } from './ctrregistry-footer.component';

describe('CtrregistryFooterComponent', () => {
  let component: CtrregistryFooterComponent;
  let fixture: ComponentFixture<CtrregistryFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtrregistryFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrregistryFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
