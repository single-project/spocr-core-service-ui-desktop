import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDepartsDialogComponent } from './shop-departs-dialog.component';

describe('ShopDepartsDialogComponent', () => {
  let component: ShopDepartsDialogComponent;
  let fixture: ComponentFixture<ShopDepartsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDepartsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDepartsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
