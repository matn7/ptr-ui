import { AppError } from "./app-error";

export class BadInput extends AppError {
  errorStatus: number;
  errorMsg: string;
  constructor(errorStatus: number, errorMsg: string) {
    super();
    this.errorStatus = errorStatus;
    this.errorMsg = errorMsg;
  }
}
