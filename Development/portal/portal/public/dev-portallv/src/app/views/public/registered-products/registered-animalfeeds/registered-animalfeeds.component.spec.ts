import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredAnimalfeedsComponent } from './registered-animalfeeds.component';

describe('RegisteredAnimalfeedsComponent', () => {
  let component: RegisteredAnimalfeedsComponent;
  let fixture: ComponentFixture<RegisteredAnimalfeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredAnimalfeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredAnimalfeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
