import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDataTableComponent } from './shop-data-table.component';

describe('ShopDataTableComponent', () => {
  let component: ShopDataTableComponent;
  let fixture: ComponentFixture<ShopDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
