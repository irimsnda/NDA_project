import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnalisedimportApplicationComponent } from './personnalisedimport-application.component';

describe('PersonnalisedimportApplicationComponent', () => {
  let component: PersonnalisedimportApplicationComponent;
  let fixture: ComponentFixture<PersonnalisedimportApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnalisedimportApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnalisedimportApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
