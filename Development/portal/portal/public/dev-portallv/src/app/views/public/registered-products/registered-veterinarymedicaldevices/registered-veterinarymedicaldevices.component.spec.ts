import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredVeterinarymedicaldevicesComponent } from './registered-veterinarymedicaldevices.component';

describe('RegisteredVeterinarymedicaldevicesComponent', () => {
  let component: RegisteredVeterinarymedicaldevicesComponent;
  let fixture: ComponentFixture<RegisteredVeterinarymedicaldevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredVeterinarymedicaldevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredVeterinarymedicaldevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
