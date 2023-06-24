import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryIdentifiersComponent } from './secondary-identifiers.component';

describe('SecondaryIdentifiersComponent', () => {
  let component: SecondaryIdentifiersComponent;
  let fixture: ComponentFixture<SecondaryIdentifiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryIdentifiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryIdentifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
