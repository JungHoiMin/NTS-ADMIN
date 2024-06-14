import { DUPLICATED_ID, NOT_FOUND, TErrorCode, WRONG_PASSWORD } from './error-code';

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

export const CustomNotFoundException = (message?: string): ServiceException => {
  return new ServiceException(NOT_FOUND, message);
};

export const WrongPasswordException = (message?: string): ServiceException => {
  return new ServiceException(WRONG_PASSWORD, message);
};
