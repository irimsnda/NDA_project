import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentCentresComponent } from './recruitment-centres.component';

describe('RecruitmentCentresComponent', () => {
  let component: RecruitmentCentresComponent;
  let fixture: ComponentFixture<RecruitmentCentresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentCentresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentCentresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
