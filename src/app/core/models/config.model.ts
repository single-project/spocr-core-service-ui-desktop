/**
 * Пример параметров
 * tz: 'Europe/Moscow',<br/>
 * format: 'DD.MM.YYYY',<br/>
 * locale: 'ru'
 */
export interface DateTimeConfig {
  tz: string,
  format: string,
  locale: string
}

export interface CalendarConfig {
  firstDayOfWeek: number;
  dayNames: string[];
  dayNamesShort: string[];
  dayNamesMin: string[];
  monthNames: string[];
  monthNamesShort: string[];
  today: string;
  clear: string;
  dateFormat: string;
  weekHeader: string;
}
