import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewclinicaltrialComponent } from './previewclinicaltrial.component';

describe('PreviewclinicaltrialComponent', () => {
  let component: PreviewclinicaltrialComponent;
  let fixture: ComponentFixture<PreviewclinicaltrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewclinicaltrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewclinicaltrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
