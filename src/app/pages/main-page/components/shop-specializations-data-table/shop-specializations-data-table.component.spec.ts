import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSpecializationsDataTableComponent } from './shop-specializations-data-table.component';

describe('ShopSpecializationsDataTableComponent', () => {
  let component: ShopSpecializationsDataTableComponent;
  let fixture: ComponentFixture<ShopSpecializationsDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSpecializationsDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSpecializationsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
