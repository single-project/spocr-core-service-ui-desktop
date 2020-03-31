import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDataTableComponent } from './owner-data-table.component';

describe('OwnerDataTableComponent', () => {
  let component: OwnerDataTableComponent;
  let fixture: ComponentFixture<OwnerDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
