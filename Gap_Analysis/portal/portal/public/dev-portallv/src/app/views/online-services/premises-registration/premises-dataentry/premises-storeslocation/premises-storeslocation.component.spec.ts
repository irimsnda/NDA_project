import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesStoreslocationComponent } from './premises-storeslocation.component';

describe('PremisesStoreslocationComponent', () => {
  let component: PremisesStoreslocationComponent;
  let fixture: ComponentFixture<PremisesStoreslocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremisesStoreslocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesStoreslocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
