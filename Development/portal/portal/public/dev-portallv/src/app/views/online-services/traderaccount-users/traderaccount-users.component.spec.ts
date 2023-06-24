import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderaccountUsersComponent } from './traderaccount-users.component';

describe('TraderaccountUsersComponent', () => {
  let component: TraderaccountUsersComponent;
  let fixture: ComponentFixture<TraderaccountUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderaccountUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderaccountUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
