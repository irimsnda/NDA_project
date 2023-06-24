import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredrugshopAppselectionComponent } from './predrugshop-appselection.component';

describe('PredrugshopAppselectionComponent', () => {
  let component: PredrugshopAppselectionComponent;
  let fixture: ComponentFixture<PredrugshopAppselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredrugshopAppselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredrugshopAppselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
