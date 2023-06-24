import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredProductappsComponent } from './registered-productapps.component';

describe('RegisteredProductappsComponent', () => {
  let component: RegisteredProductappsComponent;
  let fixture: ComponentFixture<RegisteredProductappsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredProductappsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredProductappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
