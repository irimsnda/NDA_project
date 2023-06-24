import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaceuticalPremisesComponent } from './pharmaceutical-premises.component';

describe('PharmaceuticalPremisesComponent', () => {
  let component: PharmaceuticalPremisesComponent;
  let fixture: ComponentFixture<PharmaceuticalPremisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmaceuticalPremisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaceuticalPremisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
