import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadataAddressComponent } from './dadata-address.component';

describe('DadataAddressComponent', () => {
  let component: DadataAddressComponent;
  let fixture: ComponentFixture<DadataAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadataAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadataAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
