import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalBusinessPermitComponent } from './renewal-business-permit.component';

describe('RenewalBusinessPermitComponent', () => {
  let component: RenewalBusinessPermitComponent;
  let fixture: ComponentFixture<RenewalBusinessPermitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalBusinessPermitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalBusinessPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
