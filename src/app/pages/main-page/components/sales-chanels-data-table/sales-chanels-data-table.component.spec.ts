import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesChanelsDataTableComponent } from './sales-chanels-data-table.component';

describe('SalesChanelsDataTableComponent', () => {
  let component: SalesChanelsDataTableComponent;
  let fixture: ComponentFixture<SalesChanelsDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesChanelsDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesChanelsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
