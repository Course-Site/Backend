import { createParamDecorator, ExecutionContext, Req } from '@nestjs/common';

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.id ? request.user.id : null;
  },
);
