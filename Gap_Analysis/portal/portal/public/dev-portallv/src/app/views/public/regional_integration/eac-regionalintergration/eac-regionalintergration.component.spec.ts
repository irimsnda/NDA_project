import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EacRegionalintergrationComponent } from './eac-regionalintergration.component';

describe('EacRegionalintergrationComponent', () => {
  let component: EacRegionalintergrationComponent;
  let fixture: ComponentFixture<EacRegionalintergrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EacRegionalintergrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EacRegionalintergrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
