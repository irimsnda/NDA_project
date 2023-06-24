import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControldrugsImportpermitAppComponent } from './controldrugs-importpermit-app.component';

describe('ControldrugsImportpermitAppComponent', () => {
  let component: ControldrugsImportpermitAppComponent;
  let fixture: ComponentFixture<ControldrugsImportpermitAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControldrugsImportpermitAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControldrugsImportpermitAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
