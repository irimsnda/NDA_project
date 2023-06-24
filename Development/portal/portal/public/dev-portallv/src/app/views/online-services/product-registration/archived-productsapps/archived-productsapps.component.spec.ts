import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedProductsappsComponent } from './archived-productsapps.component';

describe('ArchivedProductsappsComponent', () => {
  let component: ArchivedProductsappsComponent;
  let fixture: ComponentFixture<ArchivedProductsappsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedProductsappsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedProductsappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
