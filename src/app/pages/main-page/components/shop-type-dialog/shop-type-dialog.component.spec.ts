import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTypeDialogComponent } from './shop-type-dialog.component';

describe('ShopTypeDialogComponent', () => {
  let component: ShopTypeDialogComponent;
  let fixture: ComponentFixture<ShopTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
