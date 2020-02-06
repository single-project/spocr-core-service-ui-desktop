import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

import {DadataService} from "../../../core/services/dadata.service";
import {ShopCounterparty} from "../../../core/models/shop.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PartySuggestion} from "../../../core/models/suggestion-party.model";
import {CounterpartyModel} from "../../../core/models/counterparty.model";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-dadata-party',
  templateUrl: './dadata-party.component.html',
  styleUrls: ['./dadata-party.component.scss']
})
export class DadataPartyComponent implements OnInit, OnChanges {
  @Input() currentParty: CounterpartyModel;
  @Output() onPartySuggest = new EventEmitter<PartySuggestion>();

  private results: string[];
  private suggestions: PartySuggestion[];
  private suggetionForParent: any;
  private partyForm: FormGroup;
  private selectedItem: string;

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(DadataService) private dadata: DadataService
  ) {
    this.partyForm = fb.group({
      'partyInput': ['']
    });
  }

  ngOnInit() {
    this.results = [];
    this.selectedItem = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentParty) {
      this.partyForm.patchValue({'partyInput': this.currentParty.legalRekv.inn});
      this.suggetionForParent = this.currentParty.suggestion;
    } else {
      this.partyForm.patchValue({'addressInput': ''})
    }
  }

  select(e: any) {
    this.suggetionForParent = this.suggestions.filter(s => s.data.inn === e);
  }

  find(e: any) {
    this.dadata.partySuggest(e.query).pipe(
      tap(su => this.suggestions = su),
      map(su => su.map(s => s.data.inn)),
    ).subscribe(v => this.results = v)
  }

  onPartySave() {
    this.onPartySuggest.emit(this.suggetionForParent);
    this.results = [];
    this.selectedItem = '';
    this.suggestions = [];
  }

  onPartyClean() {
    this.results = [];
    this.selectedItem = '';
    this.suggestions = [];
    this.partyForm.patchValue({'partyInput': ''});
  }
}
