import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpAppPreviewComponent } from './gmp-app-preview.component';

describe('GmpAppPreviewComponent', () => {
  let component: GmpAppPreviewComponent;
  let fixture: ComponentFixture<GmpAppPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmpAppPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmpAppPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
