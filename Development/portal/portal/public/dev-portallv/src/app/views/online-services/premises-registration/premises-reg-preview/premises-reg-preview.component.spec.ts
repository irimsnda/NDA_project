import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesRegPreviewComponent } from './premises-reg-preview.component';

describe('PremisesRegPreviewComponent', () => {
  let component: PremisesRegPreviewComponent;
  let fixture: ComponentFixture<PremisesRegPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremisesRegPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesRegPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
