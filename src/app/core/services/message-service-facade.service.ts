import {Inject, Injectable} from '@angular/core';
import {MessageService} from "primeng";

@Injectable({
  providedIn: 'root'
})
export class MessageServiceFacadeService {

  private DEFAULT_FRAME_KEY: string =  "main-toast";

  //TODO: put it to assets/resources or assets/i18
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
    this.showMsg({
      frameKey: frameKey,
      severity: "warning",
      messageKey: messageKey,
      summary: summary,
      details: details
    });
  }

  public showErrMsg(messageKey: string, summary?: string, details?: string, frameKey?: string) {
    this.showMsg({
      frameKey: frameKey,
      severity: "error",
      messageKey: messageKey,
      summary: summary,
      details: details
    });
  }

  public showScsMsg(messageKey: string, summary?: string, details?: string, frameKey?: string) {
    this.showMsg({
      frameKey: frameKey,
      severity: "success",
      messageKey: messageKey,
      summary: summary,
      details: details
    });
  }

  public showInfMsg(messageKey: string, summary?: string, details?: string, frameKey?: string) {
    this.showMsg({
      frameKey: frameKey,
      severity: "info",
      messageKey: messageKey,
      summary: summary,
      details: details
    });
  }

  private showMsg(params: any) {
    this.messageService.add({
      key: this.getFrameKey(params.frameKey),
      sticky: true,
      severity: params.severity,
      summary: this.getMessage(params.messageKey, params.summary),
      detail: params.details
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

  private getFrameKey(frameKey?: string) {
    return frameKey === undefined?this.DEFAULT_FRAME_KEY:frameKey;
  }
}
