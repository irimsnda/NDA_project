import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicappDocumentsComponent } from './publicapp-documents.component';

describe('PublicappDocumentsComponent', () => {
  let component: PublicappDocumentsComponent;
  let fixture: ComponentFixture<PublicappDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicappDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicappDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
