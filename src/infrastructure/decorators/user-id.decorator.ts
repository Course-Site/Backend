import {
  createParamDecorator,
  ExecutionContext,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.id ? request.user.id : null;
  },
);

import { UserRole } from 'src/entiies/user/enums/user-role.enum';

import { JwtAuthGuard } from '../JWT/guards/jwt.guard';

export function Auth(role: UserRole) {
  return applyDecorators(
    role === UserRole.ADMIN ? UseGuards(JwtAuthGuard) : UseGuards(JwtAuthGuard),
  );
}
