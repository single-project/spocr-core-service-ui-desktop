import {Inject, Injectable} from '@angular/core';
import {MessageService} from "primeng";

@Injectable({
  providedIn: 'root'
})
export class MessageServiceFacadeService {

  private DEFAULT_FRAME_KEY: string = "main-toast";

  //TODO: put it to assets/resources or assets/i18
  private messagesMap = new Map();

  constructor(private messageService: MessageService) {
    //entityKey.control.operation.summary
    //entityKey.control.field
    //validation.error-key


    //key controls
    this.messagesMap.set("name", "Имя");
    this.messagesMap.set("shopTypes", "Типы ТТ");
    this.messagesMap.set("shopDeparts", "Отделы магазина");
    this.messagesMap.set("salesChannels", "Каналы продаж");
    this.messagesMap.set("shopSpecializations", "Специализации");
    this.messagesMap.set("counterparty", "Контрагент");

    // operation
    this.messagesMap.set("shop-type.dialog.save.success", "Свойства магазина успешно сохранены");
    this.messagesMap.set("shop-type.dialog.save.failed", "Не удалось сохранить тип магазина");

    this.messagesMap.set("shop-depart.dialog.save.success", "Свойства отдела магазина успешно сохранены");
    this.messagesMap.set("shop-depart.dialog.save.failed", "Не удалось сохранить отдел магазина");

    this.messagesMap.set("shop-specialization.dialog.save.success", "Свойства специализации магазина успешно сохранены");
    this.messagesMap.set("shop-specialization.dialog.save.failed", "Не удалось сохранить тип специализацию магазина");

    this.messagesMap.set("sales-channel.dialog.save.success", "Свойства канала продаж успешно сохранены");
    this.messagesMap.set("sales-channel.dialog.save.failed", "Не удалось сохранить канал продаж");

    this.messagesMap.set("owner.dialog.save.success", "Свойства хозяина сети успешно сохранены");
    this.messagesMap.set("owner.dialog.save.failed", "Не удалось сохранить хозяина сети");

    this.messagesMap.set("counterparty.dialog.save.success", "Свойства контрагента успешно сохранены");
    this.messagesMap.set("counterparty.dialog.save.failed", "Не удалось сохранить контрагента");

    this.messagesMap.set("shop.dialog.save.success", "Свойства магазина успешно сохранены");
    this.messagesMap.set("shop.dialog.save.failed", "Не удалось сохранить магазин");

    this.messagesMap.set("contract.dialog.save.success", "Свойства договора успешно сохранены");
    this.messagesMap.set("contract.dialog.save.failed", "Не удалось сохранить договор");

    this.messagesMap.set("manufacturer.dialog.save.success", "Свойства производителя успешно сохранены");
    this.messagesMap.set("manufacturer.dialog.save.failed", "Не удалось сохранить производителя");

    this.messagesMap.set("ext-system.dialog.save.success", "Свойства внешней системы успешно сохранены");
    this.messagesMap.set("ext-system.dialog.save.failed", "Не удалось сохранить внешнюю систему");

    //401
    this.messagesMap.set("401", "Неправильное имя или пароль");
    this.messagesMap.set("authorization-timed-out", "Истекло время авторизации. Повторите вход в программу...");

    //500
    this.messagesMap.set("500", "Что-то пошло не так...Обратитесь к администратору");

    //501
    this.messagesMap.set("501", "Сервис недоступен...Повторите позже");

    //required
    this.messagesMap.set("required", "Обязательно к заполнению");
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

  public getMessage(key: string): string {
    if (this.messagesMap.has(key)) {
      return this.messagesMap.get(key);
    } else {
      return key;
    }
  }

  private getFrameKey(frameKey?: string) {
    return frameKey === undefined ? this.DEFAULT_FRAME_KEY : frameKey;
  }
}
