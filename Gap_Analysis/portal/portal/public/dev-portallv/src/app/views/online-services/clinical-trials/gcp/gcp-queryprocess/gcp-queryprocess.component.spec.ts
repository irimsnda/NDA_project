import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcpQueryprocessComponent } from './gcp-queryprocess.component';

describe('GcpQueryprocessComponent', () => {
  let component: GcpQueryprocessComponent;
  let fixture: ComponentFixture<GcpQueryprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcpQueryprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcpQueryprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
