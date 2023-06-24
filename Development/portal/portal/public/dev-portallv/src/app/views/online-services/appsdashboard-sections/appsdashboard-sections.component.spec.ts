import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsdashboardSectionsComponent } from './appsdashboard-sections.component';

describe('AppsdashboardSectionsComponent', () => {
  let component: AppsdashboardSectionsComponent;
  let fixture: ComponentFixture<AppsdashboardSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsdashboardSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsdashboardSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
