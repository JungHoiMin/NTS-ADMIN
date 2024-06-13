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
export const DUPLICATED_ID = new ErrorCodeVo(HttpStatus.CONFLICT, '중복된 아이디 입니다.');
export const MANAGER_NOT_FOUND = new ErrorCodeVo(
  HttpStatus.NOT_FOUND,
  '등록되지 않은 사용자입니다.',
);
export const WRONG_PASSWORD = new ErrorCodeVo(
  HttpStatus.NOT_ACCEPTABLE,
  '비밀번호가 맞지 않습니다.',
);
export const _UNIQUE_VIOLATION = 23505;
