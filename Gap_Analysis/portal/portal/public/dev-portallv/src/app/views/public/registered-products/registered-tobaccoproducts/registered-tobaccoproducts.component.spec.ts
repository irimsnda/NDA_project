import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredTobaccoproductsComponent } from './registered-tobaccoproducts.component';

describe('RegisteredTobaccoproductsComponent', () => {
  let component: RegisteredTobaccoproductsComponent;
  let fixture: ComponentFixture<RegisteredTobaccoproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredTobaccoproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredTobaccoproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
