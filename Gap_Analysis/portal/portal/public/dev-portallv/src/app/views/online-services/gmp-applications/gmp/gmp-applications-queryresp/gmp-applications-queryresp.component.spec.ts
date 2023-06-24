import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpApplicationsQueryrespComponent } from './gmp-applications-queryresp.component';

describe('GmpApplicationsQueryrespComponent', () => {
  let component: GmpApplicationsQueryrespComponent;
  let fixture: ComponentFixture<GmpApplicationsQueryrespComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpApplicationsQueryrespComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpApplicationsQueryrespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
