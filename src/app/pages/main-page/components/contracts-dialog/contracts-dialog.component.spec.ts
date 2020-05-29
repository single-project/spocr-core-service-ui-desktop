import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsDialogComponent } from './contracts-dialog.component';

describe('ContractsDialogComponent', () => {
  let component: ContractsDialogComponent;
  let fixture: ComponentFixture<ContractsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
