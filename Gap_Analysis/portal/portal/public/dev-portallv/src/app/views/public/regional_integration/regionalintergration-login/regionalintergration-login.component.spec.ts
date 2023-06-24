import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalintergrationLoginComponent } from './regionalintergration-login.component';

describe('RegionalintergrationLoginComponent', () => {
  let component: RegionalintergrationLoginComponent;
  let fixture: ComponentFixture<RegionalintergrationLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalintergrationLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalintergrationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
