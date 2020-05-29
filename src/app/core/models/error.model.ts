export class ErrorModel {
  status: number;
  error: string;
  message: string;
  errors: string[];


  constructor(message: string) {
    this.message = message;
  }
}
