import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesChannelsDialogComponent } from './sales-channels-dialog.component';

describe('SalesChannelsDialogComponent', () => {
  let component: SalesChannelsDialogComponent;
  let fixture: ComponentFixture<SalesChannelsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesChannelsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesChannelsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
