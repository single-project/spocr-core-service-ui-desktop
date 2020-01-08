import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeTags'
})
export class ActiveTagsPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    if(value === true){
      return 'Да'
    }
    return 'Нет'
  }

}
