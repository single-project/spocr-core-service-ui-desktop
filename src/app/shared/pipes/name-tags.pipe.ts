import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'nameTags'
})
export class NameTagsPipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    return (typeof value === 'object' && value.name) ? value.name : value;
  }
}
