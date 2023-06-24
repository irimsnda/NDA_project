import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportvisaDashboardComponent } from './importvisa-dashboard.component';

describe('ImportvisaDashboardComponent', () => {
  let component: ImportvisaDashboardComponent;
  let fixture: ComponentFixture<ImportvisaDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportvisaDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportvisaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
