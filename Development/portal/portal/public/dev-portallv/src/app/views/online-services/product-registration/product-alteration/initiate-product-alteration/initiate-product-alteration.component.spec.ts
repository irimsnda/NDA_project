import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateProductAlterationComponent } from './initiate-product-alteration.component';

describe('InitiateProductAlterationComponent', () => {
  let component: InitiateProductAlterationComponent;
  let fixture: ComponentFixture<InitiateProductAlterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateProductAlterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateProductAlterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
