import { HttpException } from '@nestjs/common';

export class UserAlreadyExitsException extends HttpException {
  constructor(field: string, fieldValue: string) {
    super(`User with ${field} ${fieldValue} already exists`, 400);
  }
}
