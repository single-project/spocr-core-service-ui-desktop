import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureDataTableComponent } from './manufacture-data-table.component';

describe('ManufactureDataTableComponent', () => {
  let component: ManufactureDataTableComponent;
  let fixture: ComponentFixture<ManufactureDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufactureDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
