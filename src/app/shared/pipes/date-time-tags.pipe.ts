import {Pipe, PipeTransform} from '@angular/core';
import moment from 'moment-timezone';
import {ConfigService} from '../../core/services/config.service';
import {DateTimeConfig} from '../../core/models/config.model';

@Pipe({
  name: 'dateTimeTags'
})
export class DateTimeTagsPipe implements PipeTransform {
  dateTimeConfig: DateTimeConfig;
  constructor(private configService: ConfigService) {
    this.dateTimeConfig = this.configService.getDateTimeConfig();
  }

  /**
   * Метод вызывается из html темплейта использует библиотеку
   * [moment.js](https://momentjs.com/docs/) для построения отформатированной даты
   * "2020-03-25T13:59:11+0300"
   * moment('10/02/2020', 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ssZZ')
   * moment('10/02/2020', 'DD/MM/YYYY').utc().format('YYYY-MM-DDTHH:mm:ssZZ')
   * Пример:
   * - moment.tz("2013-12-01","US/Pacific").locale('ru').format('DD.MM.YYYY')
   * @param value - ISO8601 date string [moment ISO8601](https://momentjs.com/docs/#/parsing/string/)
   * @param args дополнительные параметры фильтра
   */
  transform(value: any, ...args: any[]): string {

    if (moment(value, moment.ISO_8601).isValid()) {
      return moment
        .tz(value, this.dateTimeConfig.tz)
        .locale(this.dateTimeConfig.locale)
        .format(this.dateTimeConfig.format);
    } else {
      return value;
    }
  }
}
