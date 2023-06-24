import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityauditAppSelectionComponent } from './qualityaudit-app-selection.component';

describe('QualityauditAppSelectionComponent', () => {
  let component: QualityauditAppSelectionComponent;
  let fixture: ComponentFixture<QualityauditAppSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityauditAppSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityauditAppSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
