import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DadataService} from "../../../core/services/dadata.service";
import {AddressSuggestion} from "../../../core/models/suggestion-address.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {map, tap} from "rxjs/operators";
import {ShopAddress} from "../../../core/models/shop.model";

@Component({
  selector: 'app-dadata-address',
  templateUrl: './dadata-address.component.html',
  styleUrls: ['./dadata-address.component.scss']
})
export class DadataAddressComponent implements OnInit, OnChanges {
  @Input() currentAddress: ShopAddress;
  @Output() onSuggest = new EventEmitter<any>();
  private results: string[];
  private suggestions: AddressSuggestion[];
  private suggetionForParent: any;
  private addressForm: FormGroup;
  private selectedItem: string;

  constructor(
    @Inject(DadataService) private dadata: DadataService,
    @Inject(FormBuilder) private fb: FormBuilder
  ) {
    this.addressForm = this.fb.group({
      'addressInput': ['']
    })
  }

  ngOnInit() {
    this.results = [];
    this.selectedItem = '';


  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.currentAddress) {
      this.addressForm.patchValue({'addressInput': this.currentAddress.address});
      this.suggetionForParent = this.currentAddress.suggestion;
    }
     else {
      this.addressForm.patchValue({'addressInput': ''})
    }
  }

  find(e) {
    this.dadata.addressSuggest(e.query).pipe(
      tap(su => this.suggestions = su),
      map(su => su.map(s => s.value)),
    ).subscribe(v => this.results = v)
  }

  select(e) {

    this.suggetionForParent = this.suggestions.filter(s => s.value === e);

  }

  onAddressClean(): void {
    this.results = [];
    this.selectedItem = '';
    this.addressForm.patchValue(
      {'addressInput': ''}
    )

  }

  onAddressSave(): void {
    console.dir(this.suggetionForParent[0]);
    this.onSuggest.emit(this.suggetionForParent[0]);
  }
}
