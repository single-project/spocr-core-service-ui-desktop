import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DadataService} from "../../../core/services/dadata.service";
import {FormGroup} from "@angular/forms";
import {PartySuggestion} from "../../../core/models/suggestion-party.model";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-dadata-party',
  templateUrl: './dadata-party.component.html',
  styleUrls: ['./dadata-party.component.scss']
})
export class DadataPartyComponent implements OnInit, OnChanges {
  @Input() parentForm: FormGroup;


  public results: any;
  public suggestions: PartySuggestion[];
  public selectedItem: string;

  constructor(
    @Inject(DadataService) private dadata: DadataService
  ) {

  }

  ngOnInit() {
    this.results = [];
    this.selectedItem = '';
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  select(e: PartySuggestion) {
    this.parentForm.patchValue({
      legalRekv: {
        shortName: e.value,
        fullName: e.unrestricted_value,
        inn: e.data.inn,
        ogrn: e.data.ogrn,
        kpp: e.data.kpp
      }
    })
  }

  find(e: any) {
    this.dadata.partySuggest(e.query).pipe(
      tap(su => this.suggestions = su),
    ).subscribe(v => this.results = v)
  }


  onPartyClean() {
    this.suggestionReset();
    this.parentForm.get('legalRekv').reset();
  }

  suggestionReset(): void {
    this.results = [];
    this.selectedItem = '';
    this.suggestions = [];
  }
}
