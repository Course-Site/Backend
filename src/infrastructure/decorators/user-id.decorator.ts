import { createParamDecorator, ExecutionContext, Req } from '@nestjs/common';

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.id ? request.user.id : null;
  },
);
/*import { UseGuards, applyDecorators } from "@nestjs/common";
import { OnlyAdminGuard } from "../guards/admin.guard";
import { JwtAuthGuard } from "../guards/jwt.guard";

export type TypeRole = "admin" | "user";

export function Auth(role: TypeRole = "user") {
    return applyDecorators(
        role === "admin" ? UseGuards(JwtAuthGuard, OnlyAdminGuard) : UseGuards(JwtAuthGuard),
    ); 
}*/