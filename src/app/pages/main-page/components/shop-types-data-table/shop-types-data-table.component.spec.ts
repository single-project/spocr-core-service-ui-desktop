import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTypesDataTableComponent } from './shop-types-data-table.component';

describe('ShopTypesDataTableComponent', () => {
  let component: ShopTypesDataTableComponent;
  let fixture: ComponentFixture<ShopTypesDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopTypesDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopTypesDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
