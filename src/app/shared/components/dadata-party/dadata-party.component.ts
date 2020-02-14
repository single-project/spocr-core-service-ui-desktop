import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

import {DadataService} from "../../../core/services/dadata.service";
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
  @Output() onInnClear = new EventEmitter<any>();

  private results: any;
  private suggestions: PartySuggestion[];
  private suggetionForParent: any;
  private partyForm: FormGroup;
  private selectedItem: string;

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(DadataService) private dadata: DadataService
  ) {
    this.partyForm = fb.group({
      'partyInput': [''],


    });
  }

  ngOnInit() {
    this.results = [];
    this.selectedItem = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentParty.legalRekv) {
      this.partyForm.patchValue({'partyInput': this.currentParty.legalRekv.inn});
      this.suggetionForParent = this.currentParty.suggestion;
    } else {
      this.partyForm.reset();
    }
  }

  select(e: any) {
    this.suggetionForParent = this.suggestions.filter(s => s.data.inn === e['data']['inn']);
  }

  find(e: any) {
    this.dadata.partySuggest(e.query).pipe(
      tap(su => this.suggestions = su),
    ).subscribe(v => this.results = v)
  }

  onPartySave() {
    this.onPartySuggest.emit(this.suggetionForParent[0]);
    this.suggestionReset();
  }

  onPartyClean() {
    this.suggestionReset();
    this.partyForm.reset();
    this.onInnClear.emit();
  }

  suggestionReset(): void {
    this.results = [];
    this.selectedItem = '';
    this.suggestions = [];
  }
}
