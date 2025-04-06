import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    // Возвращаем только нужные поля
    return {
		id: request.user?.user?.id, // Учитываем вложенность
		role: request.user?.user?.role,
	};
  },
);