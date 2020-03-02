import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AddressSuggestion, AddressSuggestionRoot} from "../models/suggestion-address.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {PartySuggestion, PartySuggestionRoot} from "../models/suggestion-party.model";
import {FioSuggestion, SuggestionFioRoot} from '../models/suggestion-fio.model';

@Injectable({
  providedIn: 'root'
})
export class DadataService {

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  addressSuggest(address: string, count = 10): Observable<AddressSuggestion[]> {
    return this.http.post<AddressSuggestionRoot>(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`, {
      'query': address,
      'count': count,
      'from_bound': {"value": "city"},
      'to_bound': {"value": "house"},
    }).pipe(
      map(data => data.suggestions)
    )
  }

  partySuggest(inn: string, count = 10): Observable<PartySuggestion[]> {
    return this.http.post<PartySuggestionRoot>('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party', {
      'query': inn,
      'count': count
    }).pipe(
      map(data => data.suggestions)
    )
  }
  fioSuggest(fio: string): Observable<FioSuggestion[]>{
    return this.http.post<SuggestionFioRoot>('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio', {
       query: fio
    }).pipe(
      map(data => data.suggestions)
    )
  }
}
