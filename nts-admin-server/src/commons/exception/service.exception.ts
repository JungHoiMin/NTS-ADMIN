import { DUPLICATED_ID, TErrorCode } from './error-code';

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
