import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DadataService } from '../../../core/services/dadata.service';
import { map, tap } from 'rxjs/operators';
import { FioSuggestion } from '../../../core/models/suggestion-fio.model';

@Component({
  selector: 'app-dadata-fio',
  templateUrl: './dadata-fio.component.html',
  styleUrls: ['./dadata-fio.component.scss']
})
export class DadataFioComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() keyName: string;

  public results: any;
  public suggestions: FioSuggestion[];
  public selectedItem: string;

  constructor(
     private dadata: DadataService,
  ) {

  }

  ngOnInit() {
    this.results = [];
    this.selectedItem = '';
  }


  select(e: string) {
    let sug = this.suggestions[0];
    this.parentForm.patchValue({
      [this.keyName]: {
        name: e,
        lastName: sug.data.surname,
        firstName: sug.data.name,
        patronymic: sug.data.patronymic,
      }
    });
  }

  find(e) {
    this.dadata.fioSuggest(e.query).pipe(
      tap(su => this.suggestions = su),
      map(s => s.map(s => s.value))
    ).subscribe(v => this.results = v)
  }


  onAddressClean(): void {
    this.suggestionReset();
    this.parentForm.patchValue({
      [this.keyName]: {
        name: '',
        lastName: '',
        firstName: '',
        patronymic: '',
      }
    })

  }

  suggestionReset(): void {
    this.results = [];
    this.selectedItem = '';
    this.suggestions = [];
  }


}
