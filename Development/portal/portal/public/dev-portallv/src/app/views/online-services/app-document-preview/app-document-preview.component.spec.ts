import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentPreviewComponent } from './app-document-preview.component';

describe('AppDocumentPreviewComponent', () => {
  let component: AppDocumentPreviewComponent;
  let fixture: ComponentFixture<AppDocumentPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDocumentPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDocumentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
