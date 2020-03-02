import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsDataTableComponent } from './contracts-data-table.component';

describe('ContractsDataTableComponent', () => {
  let component: ContractsDataTableComponent;
  let fixture: ComponentFixture<ContractsDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
