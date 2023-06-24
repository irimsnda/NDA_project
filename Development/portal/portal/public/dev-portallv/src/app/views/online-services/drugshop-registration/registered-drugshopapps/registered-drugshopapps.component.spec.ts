import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredDrugshopappsComponent } from './registered-drugshopapps.component';

describe('RegisteredDrugshopappsComponent', () => {
  let component: RegisteredDrugshopappsComponent;
  let fixture: ComponentFixture<RegisteredDrugshopappsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredDrugshopappsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredDrugshopappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
