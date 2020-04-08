import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSpecializationDialogComponent } from './shop-specialization-dialog.component';

describe('ShopSpecializationDialogComponent', () => {
  let component: ShopSpecializationDialogComponent;
  let fixture: ComponentFixture<ShopSpecializationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSpecializationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSpecializationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
