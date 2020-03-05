import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DadataService} from "../../../core/services/dadata.service";
import {AddressSuggestion} from "../../../core/models/suggestion-address.model";
import {FormGroup} from "@angular/forms";
import {map, tap} from "rxjs/operators";
import * as _ from 'lodash';

@Component({
  selector: 'app-dadata-address',
  templateUrl: './dadata-address.component.html',
  styleUrls: ['./dadata-address.component.scss']
})
export class DadataAddressComponent implements OnInit, OnChanges {
  @Input() parentForm: FormGroup;

  public results: string[];
  public suggestions: AddressSuggestion[];
  public selectedItem: string;

  constructor(
     private dadata: DadataService,
  ) {

  }

  ngOnInit() {
    this.results = [];
    this.selectedItem = '';


  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  select(e) {
    this.parentForm.patchValue({address: {suggestion: _.head(this.suggestions.filter(su => su.value === e))}});
  }

  find(e) {
    this.dadata.addressSuggestion(e.query).pipe(
      tap(su => this.suggestions = su),
      map(su => su.map(s => s.value)),
    ).subscribe(v => this.results = v)
  }


  onAddressClean(): void {
    this.results = [];
    this.selectedItem = '';
    this.suggestions = [];
    this.parentForm.patchValue({address: {address: '', suggestion: <AddressSuggestion>{}}})

  }


}
