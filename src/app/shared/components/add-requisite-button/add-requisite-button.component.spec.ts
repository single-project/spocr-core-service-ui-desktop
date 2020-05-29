import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequisiteButtonComponent } from './add-requisite-button.component';

describe('AddRequisiteButtonComponent', () => {
  let component: AddRequisiteButtonComponent;
  let fixture: ComponentFixture<AddRequisiteButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRequisiteButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequisiteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
