import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadataPartyComponent } from './dadata-party.component';

describe('DadataPartyComponent', () => {
  let component: DadataPartyComponent;
  let fixture: ComponentFixture<DadataPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadataPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadataPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
