import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdregistrantDetailsComponent } from './prodregistrant-details.component';

describe('ProdregistrantDetailsComponent', () => {
  let component: ProdregistrantDetailsComponent;
  let fixture: ComponentFixture<ProdregistrantDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdregistrantDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdregistrantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
