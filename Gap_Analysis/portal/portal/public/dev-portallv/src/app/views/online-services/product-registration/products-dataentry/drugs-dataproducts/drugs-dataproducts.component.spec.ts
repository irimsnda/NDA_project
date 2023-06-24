import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsDataproductsComponent } from './drugs-dataproducts.component';

describe('DrugsDataproductsComponent', () => {
  let component: DrugsDataproductsComponent;
  let fixture: ComponentFixture<DrugsDataproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugsDataproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsDataproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
