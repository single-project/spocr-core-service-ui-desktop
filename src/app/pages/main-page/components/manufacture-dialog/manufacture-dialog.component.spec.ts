import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureDialogComponent } from './manufacture-dialog.component';

describe('ManufactureDialogComponent', () => {
  let component: ManufactureDialogComponent;
  let fixture: ComponentFixture<ManufactureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufactureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
