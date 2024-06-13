import { DUPLICATED_ID, MANAGER_NOT_FOUND, TErrorCode, WRONG_PASSWORD } from "./error-code";

export class ServiceException extends Error {
  readonly errorCode: TErrorCode;

  constructor(errorCode: TErrorCode, message?: string) {
    if (!message) {
      message = errorCode.message;
    }

    super(message);

    this.errorCode = errorCode;
  }
}

export const IdDuplicateException = (message?: string): ServiceException => {
  return new ServiceException(DUPLICATED_ID, message);
};

export const ManagerNotFoundException = (message?: string): ServiceException => {
  return new ServiceException(MANAGER_NOT_FOUND, message);
};

export const WrongPasswordException = (message?: string): ServiceException => {
  return new ServiceException(WRONG_PASSWORD, message);
};
