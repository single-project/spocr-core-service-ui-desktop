import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtRegSystemDataTableComponent } from './ext-reg-system-data-table.component';

describe('ExtRegSystemDataTableComponent', () => {
  let component: ExtRegSystemDataTableComponent;
  let fixture: ComponentFixture<ExtRegSystemDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtRegSystemDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtRegSystemDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
