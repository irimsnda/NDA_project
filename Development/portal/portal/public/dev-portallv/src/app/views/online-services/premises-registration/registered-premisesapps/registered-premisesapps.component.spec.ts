import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredPremisesappsComponent } from './registered-premisesapps.component';

describe('RegisteredPremisesappsComponent', () => {
  let component: RegisteredPremisesappsComponent;
  let fixture: ComponentFixture<RegisteredPremisesappsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredPremisesappsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredPremisesappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
