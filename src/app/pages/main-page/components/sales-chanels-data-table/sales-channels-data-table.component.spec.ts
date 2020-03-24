import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesChannelsDataTableComponent } from './sales-channels-data-table.component';

describe('SalesChannelsDataTableComponent', () => {
  let component: SalesChannelsDataTableComponent;
  let fixture: ComponentFixture<SalesChannelsDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesChannelsDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesChannelsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
