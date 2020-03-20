import {Component, Inject, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AddressSuggestion} from '../../../core/models/suggestion-address.model';
import {DadataService} from '../../../core/services/dadata.service';
import * as _ from 'lodash';
import {map, tap} from 'rxjs/operators';
import {FioSuggestion} from '../../../core/models/suggestion-fio.model';

@Component({
  selector: 'app-dadata-fio',
  templateUrl: './dadata-fio.component.html',
  styleUrls: ['./dadata-fio.component.scss']
})
export class DadataFioComponent implements OnInit {
  @Input() parentForm2: FormGroup;

  public results: string[];
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


  select(e: FioSuggestion) {
    console.log(this.parentForm2);
    console.dir(e);
    this.parentForm2.patchValue({
      personRekv: {
        name: `${e.data.surname} ${e.data.name} ${e.data.patronymic}`,
        lastName: e.data.surname,
        firstName: e.data.name,
        patronymic: e.data.patronymic,
      }
    });
  }

  find(e) {
    this.dadata.fioSuggest(e.query).pipe(
      tap(su => this.suggestions = su),
      map(su => su.map(s => s.value)),
    ).subscribe(v => this.results = v)
  }


  onAddressClean(): void {
    this.suggestionReset();
    this.parentForm2.patchValue({
      personRekv: {
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
