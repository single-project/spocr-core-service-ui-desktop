import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterpartyDialogComponent } from './counterparty-dialog.component';

describe('CounterpartyDialogComponent', () => {
  let component: CounterpartyDialogComponent;
  let fixture: ComponentFixture<CounterpartyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterpartyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterpartyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
