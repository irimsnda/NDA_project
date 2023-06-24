import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportlicAmmendrequestComponent } from './importexportlic-ammendrequest.component';

describe('ImportexportlicAmmendrequestComponent', () => {
  let component: ImportexportlicAmmendrequestComponent;
  let fixture: ComponentFixture<ImportexportlicAmmendrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportexportlicAmmendrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportexportlicAmmendrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
