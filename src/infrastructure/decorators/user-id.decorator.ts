import { createParamDecorator, ExecutionContext, Req } from '@nestjs/common';

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.id ? request.user.id : null;
  },
);
import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from '../JWT/guards/jwt.guard';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';

export function Auth(role: UserRole) {
  return applyDecorators(
    role === UserRole.ADMIN ? UseGuards(JwtAuthGuard) : UseGuards(JwtAuthGuard),
  );
}
