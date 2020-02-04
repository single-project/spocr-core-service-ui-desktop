import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AddressData, AddressSuggestionRoot} from "../models/suggestion-address.model";
import {HttpClient} from "@angular/common/http";
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DadataService {

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  addressSuggest(address: string, count = 1): Observable<AddressData[]>{
    return this.http.post<AddressSuggestionRoot>(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`, {
      'query': address,
      'count': count
    }).pipe(
      map(data => data.suggestions.map(s => s.data))
    )
  }
}
