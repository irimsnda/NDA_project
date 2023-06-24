import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomerComplainsComponent } from './cutomer-complains.component';

describe('CutomerComplainsComponent', () => {
  let component: CutomerComplainsComponent;
  let fixture: ComponentFixture<CutomerComplainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutomerComplainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutomerComplainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
