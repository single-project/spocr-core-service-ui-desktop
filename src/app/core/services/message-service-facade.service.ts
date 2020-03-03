import {Inject, Injectable} from '@angular/core';
import {MessageService} from "primeng";

@Injectable({
  providedIn: 'root'
})
export class MessageServiceFacadeService {

  //TODO: put it to assets/resources
  private messagesMap = new Map();


  constructor(@Inject(MessageService) private messageService: MessageService) {
    //401
    this.messagesMap.set("401", "Неправильное имя или пароль");

    //500
    this.messagesMap.set("500", "Что-то пошло не так...Обратитесь к администратору");

    //501
    this.messagesMap.set("501", "Сервис недоступен...Повторите позже");
  }


  public showWrnMsg(messageKey: string, summary?: string, details?: string, frameKey?: string) {
    this.showMsg(messageKey, 'error', this.getMessage(messageKey, summary), details);
  }

  public showErrMsg(messageKey: string, summary?: string, details?: string, frameKey?: string) {
    this.showMsg(messageKey, 'error', this.getMessage(messageKey, summary), details);
  }

  public showScsMsg(messageKey: string, summary?: string, details?: string, frameKey?: string) {
    this.showMsg(messageKey, 'success', this.getMessage(messageKey, summary), details);
  }

  public showInfMsg(messageKey: string, summary?: string, details?: string, frameKey?: string) {
    this.showMsg(messageKey, 'info', this.getMessage(messageKey, summary), details);
  }

  private showMsg(key: string, severity: string, summary: string, details?: string, frameKey?: string) {
    if (frameKey === undefined) {
      frameKey = "main-toast";
    }

    this.messageService.add({
      key: frameKey,
      sticky: true,
      severity: severity,
      summary: summary,
      detail: details
    });
  }

  private getMessage(key: string, defaultMessage?: string): string {
    if (this.messagesMap.has(key)) {
      return this.messagesMap.get(key);
    } else if (defaultMessage != undefined) {
      return defaultMessage;
    } else {
      return key;
    }
  }
}
