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
export const DUPLICATED = new ErrorCodeVo(HttpStatus.CONFLICT, '중복되었습니다.');
export const NOT_FOUND = new ErrorCodeVo(HttpStatus.NOT_FOUND, '등록되지 않았습니다.');
export const WRONG_PASSWORD = new ErrorCodeVo(
  HttpStatus.NOT_ACCEPTABLE,
  '비밀번호가 맞지 않습니다.',
);
export const _UNIQUE_VIOLATION = 23505;
