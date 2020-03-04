import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDepartmentsDataTableComponent } from './shop-departments-data-table.component';

describe('ShopDepartmentsDataTableComponent', () => {
  let component: ShopDepartmentsDataTableComponent;
  let fixture: ComponentFixture<ShopDepartmentsDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDepartmentsDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDepartmentsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
