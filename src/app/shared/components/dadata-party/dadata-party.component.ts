import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';

import {DadataService} from "../../../core/services/dadata.service";
import {Counterparty} from "../../../core/models/shop.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PartySuggestion} from "../../../core/models/suggestion-party.model";

@Component({
  selector: 'app-dadata-party',
  templateUrl: './dadata-party.component.html',
  styleUrls: ['./dadata-party.component.scss']
})
export class DadataPartyComponent implements OnInit {
  @Input() currentParty: Counterparty;
  @Output() onSuggest = new EventEmitter<any>();

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
  }

  select(e: any) {

  }

  find(e: any) {

  }

  onPartySave() {

  }

  onPartyClean() {

  }
}
