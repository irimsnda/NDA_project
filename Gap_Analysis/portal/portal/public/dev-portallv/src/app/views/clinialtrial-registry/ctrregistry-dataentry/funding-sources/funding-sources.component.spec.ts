import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingSourcesComponent } from './funding-sources.component';

describe('FundingSourcesComponent', () => {
  let component: FundingSourcesComponent;
  let fixture: ComponentFixture<FundingSourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundingSourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
