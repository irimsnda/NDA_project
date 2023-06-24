import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadcRegionalintergrationComponent } from './sadc-regionalintergration.component';

describe('SadcRegionalintergrationComponent', () => {
  let component: SadcRegionalintergrationComponent;
  let fixture: ComponentFixture<SadcRegionalintergrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadcRegionalintergrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadcRegionalintergrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
