import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersPopupInputSetComponent } from './filters-popup-input-set.component';

describe('FiltersPopupInputSetComponent', () => {
  let component: FiltersPopupInputSetComponent;
  let fixture: ComponentFixture<FiltersPopupInputSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersPopupInputSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersPopupInputSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
