import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradefairpermitAppComponent } from './tradefairpermit-app.component';

describe('TradefairpermitAppComponent', () => {
  let component: TradefairpermitAppComponent;
  let fixture: ComponentFixture<TradefairpermitAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradefairpermitAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradefairpermitAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
