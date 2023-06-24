import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargedocumentsUploadComponent } from './largedocuments-upload.component';

describe('LargedocumentsUploadComponent', () => {
  let component: LargedocumentsUploadComponent;
  let fixture: ComponentFixture<LargedocumentsUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargedocumentsUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargedocumentsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
