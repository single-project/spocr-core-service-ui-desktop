import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadataFioComponent } from './dadata-fio.component';

describe('DadataFioComponent', () => {
  let component: DadataFioComponent;
  let fixture: ComponentFixture<DadataFioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadataFioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadataFioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
