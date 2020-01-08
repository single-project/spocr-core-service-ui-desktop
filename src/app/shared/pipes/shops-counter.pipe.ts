import { Pipe, PipeTransform } from '@angular/core';
import {CounterpartyModel} from "../../core/models/counterparty.model";

@Pipe({
  name: 'shopsCounter'
})
export class ShopsCounterPipe implements PipeTransform {

  transform(value: CounterpartyModel, ...args: any[]): string {
    const {name} = value;
    return name;
  }

}
