import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQualityauditApplicationComponent } from './new-qualityaudit-application.component';

describe('NewQualityauditApplicationComponent', () => {
  let component: NewQualityauditApplicationComponent;
  let fixture: ComponentFixture<NewQualityauditApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQualityauditApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQualityauditApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
