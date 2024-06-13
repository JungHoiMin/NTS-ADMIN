import { HttpStatus } from '@nestjs/common';

class ErrorCodeVo {
  readonly status: number;
  readonly message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export type TErrorCode = ErrorCodeVo;
export const DUPLICATED_ID = new ErrorCodeVo(HttpStatus.CONFLICT, '아이디 중복됨.');

export const _UNIQUE_VIOLATION = 23505;
