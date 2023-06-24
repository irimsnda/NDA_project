import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmeticsPremisesComponent } from './cosmetics-premises.component';

describe('CosmeticsPremisesComponent', () => {
  let component: CosmeticsPremisesComponent;
  let fixture: ComponentFixture<CosmeticsPremisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosmeticsPremisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosmeticsPremisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
