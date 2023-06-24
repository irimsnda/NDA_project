import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationQueriesComponent } from './application-queries.component';

describe('ApplicationQueriesComponent', () => {
  let component: ApplicationQueriesComponent;
  let fixture: ComponentFixture<ApplicationQueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationQueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
