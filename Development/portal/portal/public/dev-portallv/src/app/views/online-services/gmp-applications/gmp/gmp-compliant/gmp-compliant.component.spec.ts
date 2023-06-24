import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpCompliantComponent } from './gmp-compliant.component';

describe('GmpCompliantComponent', () => {
  let component: GmpCompliantComponent;
  let fixture: ComponentFixture<GmpCompliantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpCompliantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpCompliantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
