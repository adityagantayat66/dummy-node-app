import { HttpException } from '@nestjs/common';

export function handleError(statusCode: number, message: string): never {
  throw new HttpException({ statusCode, message }, statusCode);
}
