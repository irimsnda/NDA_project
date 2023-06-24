import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesAlterationComponent } from './premises-alteration.component';

describe('PremisesAlterationComponent', () => {
  let component: PremisesAlterationComponent;
  let fixture: ComponentFixture<PremisesAlterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremisesAlterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesAlterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
