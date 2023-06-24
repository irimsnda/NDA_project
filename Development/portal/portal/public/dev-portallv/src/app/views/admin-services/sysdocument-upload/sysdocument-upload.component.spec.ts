import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysdocumentUploadComponent } from './sysdocument-upload.component';

describe('SysdocumentUploadComponent', () => {
  let component: SysdocumentUploadComponent;
  let fixture: ComponentFixture<SysdocumentUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysdocumentUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysdocumentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
