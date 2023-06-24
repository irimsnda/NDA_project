import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredQualityauditselectionComponent } from './registered-qualityauditselection.component';

describe('RegisteredQualityauditselectionComponent', () => {
  let component: RegisteredQualityauditselectionComponent;
  let fixture: ComponentFixture<RegisteredQualityauditselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredQualityauditselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredQualityauditselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
