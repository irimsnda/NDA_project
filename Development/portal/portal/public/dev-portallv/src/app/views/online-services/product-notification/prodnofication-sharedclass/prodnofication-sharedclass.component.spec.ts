import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdnoficationSharedclassComponent } from './prodnofication-sharedclass.component';

describe('ProdnoficationSharedclassComponent', () => {
  let component: ProdnoficationSharedclassComponent;
  let fixture: ComponentFixture<ProdnoficationSharedclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdnoficationSharedclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdnoficationSharedclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
