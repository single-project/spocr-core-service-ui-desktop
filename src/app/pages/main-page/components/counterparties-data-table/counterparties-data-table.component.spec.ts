import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterpartiesDataTableComponent } from './counterparties-data-table.component';

describe('CounterpartiesDataTableComponent', () => {
  let component: CounterpartiesDataTableComponent;
  let fixture: ComponentFixture<CounterpartiesDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterpartiesDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterpartiesDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
