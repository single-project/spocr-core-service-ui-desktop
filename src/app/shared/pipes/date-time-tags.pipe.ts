import {Pipe, PipeTransform} from '@angular/core';
import moment from 'moment-timezone';
import {ConfigService} from '../../core/services/config.service';

@Pipe({
  name: 'dateTimeTags'
})
export class DateTimeTagsPipe implements PipeTransform {
  constructor(private configService: ConfigService) {
  }

  /**
   * Метод вызывается из thml темплейта использует библиотеку
   * [moment.js](https://momentjs.com/docs/) для построения отформатированной даты
   * Пример:
   * - moment.tz("2013-12-01","US/Pacific").locale('ru').format('DD.MM.YYYY')
   * @param {string} value - ISO8601 date string [moment ISO8601](https://momentjs.com/docs/#/parsing/string/)
   * @param args
   */
  transform(value: any, ...args: any[]): string {
    if(moment(value, moment.ISO_8601).isValid()) {
      return moment
        .tz(value,this.configService.fetchDateTimeConfig().tz)
        .locale(this.configService.fetchDateTimeConfig().locale)
        .format(this.configService.fetchDateTimeConfig().format);
    } else {
      return value
    }
  }
}
