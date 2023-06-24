import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedPremisesComponent } from './archived-premises.component';

describe('ArchivedPremisesComponent', () => {
  let component: ArchivedPremisesComponent;
  let fixture: ComponentFixture<ArchivedPremisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedPremisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedPremisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
