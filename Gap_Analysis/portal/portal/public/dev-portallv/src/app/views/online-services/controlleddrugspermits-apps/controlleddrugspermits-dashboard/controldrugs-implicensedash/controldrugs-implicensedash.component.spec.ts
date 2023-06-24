import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControldrugsImplicensedashComponent } from './controldrugs-implicensedash.component';

describe('ControldrugsImplicensedashComponent', () => {
  let component: ControldrugsImplicensedashComponent;
  let fixture: ComponentFixture<ControldrugsImplicensedashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControldrugsImplicensedashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControldrugsImplicensedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
