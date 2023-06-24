import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntisepticProductdetailsComponent } from './antiseptic-productdetails.component';

describe('AntisepticProductdetailsComponent', () => {
  let component: AntisepticProductdetailsComponent;
  let fixture: ComponentFixture<AntisepticProductdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntisepticProductdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntisepticProductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
