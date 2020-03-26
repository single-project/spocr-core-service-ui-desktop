import {Inject, Injectable} from '@angular/core';
import {MessageService} from "primeng";

@Injectable({
  providedIn: 'root'
})
export class MessageServiceFacadeService {

  private DEFAULT_FRAME_KEY: string =  "main-toast";

  //TODO: put it to assets/resources or assets/i18
  private messagesMap = new Map();

  public ruCalLocale = {
    firstDayOfWeek: 1,
    dayNames: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение"],
    dayNamesShort: ["Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт", "Вск"],
    dayNamesMin: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    today: 'Сегодня',
    clear: 'Очист.',
    dateFormat: 'dd.mm.yy',
    weekHeader: 'Нед'
  };

  constructor( private messageService: MessageService) {
    //entityKey.control.operation.summary
    //entityKey.control.field
    //validation.error-key


    // operation
    this.messagesMap.set("shop-type.dialog.save.success", "Свойства магазина успешно сохранены");
    this.messagesMap.set("shop-type.dialog.save.failed", "Не удалось сохранить тип магазина");

    this.messagesMap.set("counterparty.dialog.save.success", "Свойства контрагента успешно сохранены");
    this.messagesMap.set("counterparty.dialog.save.failed", "Не удалось сохранить контрагента");

    //401
    this.messagesMap.set("401", "Неправильное имя или пароль");

    //500
    this.messagesMap.set("500", "Что-то пошло не так...Обратитесь к администратору");

    //501
    this.messagesMap.set("501", "Сервис недоступен...Повторите позже");
  }


  public showWrnMsg(messageKey: string, details?: string, frameKey?: string) {
    this.showMsg({
      frameKey: frameKey,
      severity: "warning",
      messageKey: messageKey,
      details: details
    });
  }

  public showErrMsg(messageKey: string, details?: string, frameKey?: string) {
    this.showMsg({
      frameKey: frameKey,
      severity: "error",
      messageKey: messageKey,
      details: details
    });
  }

  public showScsMsg(messageKey: string, details?: string, frameKey?: string) {
    this.showMsg({
      frameKey: frameKey,
      severity: "success",
      messageKey: messageKey,
      details: details
    });
  }

  public showInfMsg(messageKey: string, details?: string, frameKey?: string) {
    this.showMsg({
      frameKey: frameKey,
      severity: "info",
      messageKey: messageKey,
      details: details
    });
  }

  private showMsg(params: any) {
    this.messageService.add({
      key: this.getFrameKey(params.frameKey),
      sticky: true,
      severity: params.severity,
      summary: this.getMessage(params.messageKey),
      detail: params.details
    });
  }

  private getMessage(key: string): string {
    if (this.messagesMap.has(key)) {
      return this.messagesMap.get(key);
    } else {
      return key;
    }
  }

  private getFrameKey(frameKey?: string) {
    return frameKey === undefined?this.DEFAULT_FRAME_KEY:frameKey;
  }
}
