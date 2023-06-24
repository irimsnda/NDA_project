import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionexhibitionTradefairdashComponent } from './extensionexhibition-tradefairdash.component';

describe('ExtensionexhibitionTradefairdashComponent', () => {
  let component: ExtensionexhibitionTradefairdashComponent;
  let fixture: ComponentFixture<ExtensionexhibitionTradefairdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtensionexhibitionTradefairdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionexhibitionTradefairdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
