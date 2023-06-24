import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistsaccountUserComponent } from './pharmacistsaccount-user.component';

describe('PharmacistsaccountUserComponent', () => {
  let component: PharmacistsaccountUserComponent;
  let fixture: ComponentFixture<PharmacistsaccountUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacistsaccountUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistsaccountUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
