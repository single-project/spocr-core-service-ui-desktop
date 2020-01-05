import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersPopupCheckboxSetComponent } from './filters-popup-checkbox-set.component';

describe('FiltersPopupCheckboxSetComponent', () => {
  let component: FiltersPopupCheckboxSetComponent;
  let fixture: ComponentFixture<FiltersPopupCheckboxSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersPopupCheckboxSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersPopupCheckboxSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
