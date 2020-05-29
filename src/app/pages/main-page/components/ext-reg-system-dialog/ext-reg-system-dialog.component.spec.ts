import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtRegSystemDialogComponent } from './ext-reg-system-dialog.component';

describe('ExtRegSystemDialogComponent', () => {
  let component: ExtRegSystemDialogComponent;
  let fixture: ComponentFixture<ExtRegSystemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtRegSystemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtRegSystemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
